
//#region src/webix/host.ts
const DEFAULTS = {
	wasmUrl: "/containers/blinkenlib.wasm",
	glueUrl: "/containers/blinkenlib.js",
	rootfsUrl: "/containers/alpine-minirootfs-x86_64.tar.gz"
};
const BUSYBOX_PATH = "/bin/busybox";
const isBrowser = typeof globalThis.window !== "undefined" && typeof fetch !== "undefined";
/** Gunzip bytes if they carry the gzip magic, else return as-is. */
async function maybeGunzip(bytes) {
	if (bytes.length < 2 || bytes[0] !== 31 || bytes[1] !== 139) return bytes;
	if (typeof DecompressionStream !== "undefined") {
		const ds = new DecompressionStream("gzip");
		const stream = new Response(bytes).body.pipeThrough(ds);
		return new Uint8Array(await new Response(stream).arrayBuffer());
	}
	const { gunzipSync } = await import("node:zlib");
	return new Uint8Array(gunzipSync(bytes));
}
/**
* The Blink faketty echoes the command line as a shell prompt before the real
* output: `\n$ <argv joined by space>\n<output>`. Strip exactly that known
* prefix so runCommand stdout is the command's actual output. Matching the
* exact joined argv (not a generic `$ ` regex) avoids clobbering output that
* legitimately contains `$ ` lines.
*/
function stripBlinkPrompt(stdout, argv) {
	const prompt = "$ " + argv.join(" ") + "\n";
	if (stdout.startsWith(prompt)) return stdout.slice(prompt.length);
	if (stdout.startsWith("\n" + prompt)) return stdout.slice(prompt.length + 1);
	return stdout;
}
/** Versioned Cache API bucket for the multi-MB rootfs/wasm assets. Bump the
* suffix when the asset format changes to invalidate stale entries. */
const ASSET_CACHE = "webix-assets-v1";
/**
* Fetch the same-origin asset bytes, served from the Cache API on repeat loads.
* The rootfs tarball is multi-MB; caching it means the first paint pays the
* network cost once and every subsequent page load reads it from disk cache
* with no network round-trip. Falls back to a plain fetch where the Cache API
* is unavailable (older browsers, non-secure contexts).
*/
async function fetchResponse(url) {
	if (typeof caches !== "undefined") try {
		const cache = await caches.open(ASSET_CACHE);
		const hit = await cache.match(url);
		if (hit) return hit;
		const res = await fetch(url);
		if (res.ok) await cache.put(url, res.clone());
		return res;
	} catch {}
	return fetch(url);
}
async function fetchBytes(url) {
	if (isBrowser) {
		const res = await fetchResponse(url);
		if (!res.ok) throw new Error(`webix: failed to fetch ${url} (HTTP ${res.status}). The wasm must be served with Content-Type: application/wasm.`);
		return new Uint8Array(await res.arrayBuffer());
	}
	const { readFile } = await import("node:fs/promises");
	const { fileURLToPath } = await import("node:url");
	const path = url.startsWith("file:") ? fileURLToPath(url) : url;
	return new Uint8Array(await readFile(path));
}
var WebixHost = class {
	constructor(opts = {}) {
		this.core = null;
		this.busyboxHandle = null;
		this.runQueue = Promise.resolve();
		this.stopped = false;
		this.apkInstance = null;
		this.opts = opts;
	}
	/** Boot the Blink host, mount the rootfs, and preload busybox. Idempotent. */
	async boot() {
		if (this.core) return;
		const progress = this.opts.onProgress ?? (() => {});
		const wasmUrl = this.opts.wasmUrl ?? DEFAULTS.wasmUrl;
		const glueUrl = this.opts.glueUrl ?? DEFAULTS.glueUrl;
		progress("runtime");
		if (isBrowser) {
			const { createBlinkHostBrowser } = await import("webix/blink-browser");
			this.core = await createBlinkHostBrowser({
				wasmUrl,
				glueUrl
			});
		} else {
			const g = globalThis;
			if (typeof g.self === "undefined") g.self = globalThis;
			const { createBlinkHost } = await import(
				/* webpackIgnore: true */
				/* @vite-ignore */
				"webix/blink"
);
			this.core = await createBlinkHost({
				wasmPath: this.opts.wasmPath ?? wasmUrl.replace(/^\//, ""),
				gluePath: this.opts.gluePath ?? glueUrl.replace(/^\//, "")
			});
		}
		progress("rootfs");
		const rootfsBytes = this.opts.rootfsTarBytes ?? await maybeGunzip(await fetchBytes(this.opts.rootfsUrl ?? DEFAULTS.rootfsUrl));
		progress("mount");
		this.core.mountTarBytes(rootfsBytes);
		try {
			const bb = this.core.Module.FS.readFile(BUSYBOX_PATH);
			this.busyboxHandle = this.core.preloadFile("busybox", bb);
		} catch {
			this.busyboxHandle = null;
		}
		progress("ready");
	}
	ensureCore() {
		if (this.stopped) throw new Error("webix: sandbox has been stopped");
		if (!this.core) throw new Error("webix: host not booted (call boot())");
		return this.core;
	}
	get fs() {
		return this.ensureCore().Module.FS;
	}
	/**
	* Mount an IDBFS-backed persistent directory (default `/persist`) and load
	* its contents from IndexedDB (syncfs in). Files written under it survive a
	* page reload once {@link syncPersist} is called. Browser-only (IDBFS).
	*/
	persistDir(guestDir) {
		return this.ensureCore().persistDir(guestDir);
	}
	/** Flush the IDBFS-mounted persistent dir to IndexedDB (syncfs out). */
	syncPersist() {
		return this.ensureCore().syncPersist();
	}
	async ensureApk() {
		if (this.apkInstance) return this.apkInstance;
		this.ensureCore();
		const { createApk } = await import("webix/alpine-apk");
		this.apkInstance = createApk(this.core, {});
		return this.apkInstance;
	}
	async pkgSearch(query, opts) {
		return (await this.ensureApk()).search(query, opts);
	}
	async pkgInfo(name) {
		return (await this.ensureApk()).pkgInfo(name);
	}
	async pkgInstall(name) {
		return (await this.ensureApk()).addByName(name);
	}
	async pkgRemove(name) {
		return (await this.ensureApk()).remove(name);
	}
	async pkgInstalled() {
		return (await this.ensureApk()).list();
	}
	/** Whether `/bin/busybox` exists in the mounted rootfs. */
	get hasBusybox() {
		return this.busyboxHandle !== null;
	}
	/**
	* Run an ELF (by guest-FS path or raw bytes) to completion. Calls are
	* serialized: Blink is single-threaded and rejects overlapping runs, so we
	* chain them through an internal queue.
	*/
	runElf(elf, argv) {
		const run = this.runQueue.then(async () => {
			const r = await this.ensureCore().runElf(elf.bytes ?? null, {
				argv,
				path: elf.path
			});
			return {
				...r,
				stdout: stripBlinkPrompt(r.stdout, argv)
			};
		});
		this.runQueue = run.then(() => void 0, () => void 0);
		return run;
	}
	/**
	* Run an X server (Xvfb) and an X client concurrently in-page, each on its
	* own worker pthread, talking over blink's in-process AF_UNIX layer. Resolves
	* when the client exits (server kept RUNNING). Serialized through the run
	* queue like runElf — it holds the host for its whole duration.
	*/
	runConcurrent(server, client, opts) {
		const run = this.runQueue.then(async () => {
			const core = this.ensureCore();
			if (typeof core.runConcurrent !== "function") throw new Error("webix: runConcurrent missing (rebuild blink/blink-core)");
			return core.runConcurrent(server.bytes, client.bytes, {
				serverArgv: server.argv ?? [],
				serverProgname: server.progname ?? "/xserver",
				clientArgv: client.argv ?? [],
				clientProgname: client.progname ?? "/xclient",
				...opts
			});
		});
		this.runQueue = run.then(() => void 0, () => void 0);
		return run;
	}
	/**
	* Start a PERSISTENT X server (Xvfb) in-page that keeps serving while clients
	* come and go (unlike runConcurrent, which is one-shot). The server VM stays
	* on its worker pthread with an always-on proxy pump so its framebuffer keeps
	* updating; the host can blit fbView() on rAF meanwhile. NOT enqueued on the
	* run queue (it never finishes) — launchXClient() serializes the clients.
	*/
	async startXServer(server) {
		const core = this.ensureCore();
		if (typeof core.startXServer !== "function") throw new Error("webix: startXServer missing (rebuild blink-core)");
		return core.startXServer(server.bytes, {
			argv: server.argv ?? [],
			progname: server.progname ?? "/xserver"
		});
	}
	/**
	* Launch an X client against the running persistent server. Resolves with the
	* client's exit when it exits; the server keeps serving. Serialized on the run
	* queue so only one client launch is in flight at a time.
	*/
	launchXClient(client) {
		const run = this.runQueue.then(async () => {
			const core = this.ensureCore();
			if (typeof core.launchXClient !== "function") throw new Error("webix: launchXClient missing (rebuild blink-core)");
			return core.launchXClient(client.bytes, {
				argv: client.argv ?? [],
				progname: client.progname ?? "/xclient",
				timeoutMs: client.timeoutMs ?? 6e4
			});
		});
		this.runQueue = run.then(() => void 0, () => void 0);
		return run;
	}
	/** Stop the persistent X server's proxy pump (VMs reaped on teardown). */
	stopX() {
		this.ensureCore().stopX?.();
	}
	/** Whether a persistent X server is currently running. */
	xRunning() {
		return !!this.ensureCore().xRunning?.();
	}
	/** Run a command via busybox: `busybox <argv...>` (applet dispatch). */
	runBusybox(argv) {
		if (!this.busyboxHandle) throw new Error("webix: busybox not present in rootfs");
		return this.runElf({ path: this.busyboxHandle }, argv);
	}
	/**
	* Framebuffer geometry the guest published via syscall 0x5fb, or null if no
	* guest has registered a framebuffer yet.
	*/
	fbInfo() {
		return this.ensureCore().fbInfo?.() ?? null;
	}
	/**
	* Zero-copy view over the guest framebuffer (re-derived each call; safe
	* against ALLOW_MEMORY_GROWTH detach). Null until a guest registers one.
	*/
	fbView() {
		return this.ensureCore().fbView?.() ?? null;
	}
	/**
	* Attach a canvas to the live framebuffer via webix's display module: a rAF
	* blit loop that paints guest pixels and forwards canvas key/mouse events
	* into the guest input device. Returns a controller with stats()/stop().
	*/
	async attachDisplay(canvas, opts) {
		const core = this.ensureCore();
		const { attachDisplay } = await import("webix/display");
		return attachDisplay(core, canvas, opts);
	}
	/**
	* Push one input event into the guest input ring (host -> guest). Event
	* shape: { type: "key"|"motion"|"button", code?, button?, x?, y?, down? }.
	* Returns false if the running wasm predates the input device.
	*/
	pushInput(evt) {
		return this.ensureCore().pushInput?.(evt) ?? false;
	}
	/** Capability flags of the running Blink build. */
	get capabilities() {
		return this.ensureCore().capabilities ?? {};
	}
	snapshot() {
		return this.ensureCore().snapshot();
	}
	restore(snap) {
		this.ensureCore().restore(snap);
	}
	stop() {
		this.stopped = true;
		this.core = null;
		this.busyboxHandle = null;
	}
};

//#endregion
exports.WebixHost = WebixHost;
//# sourceMappingURL=host.cjs.map