import { WebixHost } from "../webix/host.js";
import { normalizePath } from "../utils/normalizePath.js";

//#region src/api-client/webix-client.ts
/**
* WebixApiClient — a drop-in replacement for the remote HTTP APIClient that
* drives a self-contained in-browser x86_64 Linux microVM (webix / Blink WASM)
* instead of contacting Vercel. It implements the same method surface that
* Sandbox/Session/Snapshot/Command call, returning the same `{ json }`-wrapped
* response shapes, so the higher-level classes are unchanged.
*
* There is no network: the Blink build is NOSOCK, so ports/domains/dev-servers
* are unavailable and the corresponding methods throw {@link NotSupportedError}.
*/
var NotSupportedError = class extends Error {
	constructor(..._args) {
		super(..._args);
		this.name = "NotSupportedError";
	}
};
/** Wrap a value as the `{ json }` Parsed shape the callers consume. */
function parsed(json) {
	return {
		json,
		response: new Response(null),
		text: ""
	};
}
function now() {
	return Date.now();
}
const DEFAULT_CWD = "/root";
var WebixApiClient = class {
	constructor(opts = {}) {
		this.booted = false;
		this.sessionId = "sbx_local_" + Math.random().toString(36).slice(2, 12);
		this.cwd = DEFAULT_CWD;
		this.status = "pending";
		this.commands = /* @__PURE__ */ new Map();
		this.snapshots = /* @__PURE__ */ new Map();
		this.createdAt = now();
		this.host = new WebixHost(opts);
		this.sandboxName = opts.name ?? "local-" + Math.random().toString(36).slice(2, 8);
		this.runtime = opts.runtime ?? "x86_64-linux";
	}
	async ensureBooted() {
		if (this.booted) return;
		await this.host.boot();
		this.booted = true;
		this.status = "running";
	}
	sessionMeta() {
		return {
			id: this.sessionId,
			memory: 2048,
			vcpus: 1,
			region: "local",
			runtime: this.runtime,
			timeout: 0,
			status: this.status,
			requestedAt: this.createdAt,
			startedAt: this.createdAt,
			createdAt: this.createdAt,
			updatedAt: now(),
			cwd: this.cwd
		};
	}
	sandboxMeta() {
		return {
			name: this.sandboxName,
			persistent: false,
			region: "local",
			vcpus: 1,
			memory: 2048,
			runtime: this.runtime,
			timeout: 0,
			createdAt: this.createdAt,
			updatedAt: now(),
			currentSessionId: this.sessionId,
			status: this.status,
			cwd: this.cwd
		};
	}
	async createSandbox(params) {
		if (params.name) this.sandboxName = params.name;
		if (params.runtime) this.runtime = params.runtime;
		await this.ensureBooted();
		if (params.cwd) this.cwd = params.cwd;
		return parsed({
			sandbox: this.sandboxMeta(),
			session: this.sessionMeta(),
			routes: []
		});
	}
	async getSandbox() {
		await this.ensureBooted();
		return parsed({
			sandbox: this.sandboxMeta(),
			session: this.sessionMeta(),
			routes: []
		});
	}
	async getSession(_params) {
		return parsed({
			session: this.sessionMeta(),
			routes: []
		});
	}
	async stopSession(_params) {
		this.status = "stopped";
		this.host.stop();
		return parsed({
			session: this.sessionMeta(),
			sandbox: this.sandboxMeta(),
			snapshot: void 0
		});
	}
	async extendTimeout(_params) {
		return parsed({ session: this.sessionMeta() });
	}
	/** Resolve and run a command, returning its full result. */
	async exec(command, args, cwd, env) {
		await this.ensureBooted();
		const wd = cwd ?? this.cwd;
		const needsShell = !!cwd || env && Object.keys(env).length > 0;
		const fs = this.host.fs;
		const isAbsolute = command.startsWith("/");
		const exists = (p) => {
			try {
				fs.stat(p);
				return true;
			} catch {
				return false;
			}
		};
		if (!needsShell) {
			if (isAbsolute && exists(command)) {
				const bytes = fs.readFile(command);
				return this.host.runElf({ bytes }, [command.split("/").pop(), ...args]);
			}
			return this.host.runBusybox([command, ...args]);
		}
		const q = (s) => "'" + s.replace(/'/g, "'\\''") + "'";
		const envPrefix = env ? Object.entries(env).map(([k, v]) => `${k}=${q(v)}`).join(" ") + " " : "";
		const line = `cd ${q(wd)} && ${envPrefix}${[command, ...args].map(q).join(" ")}`;
		return this.host.runBusybox([
			"sh",
			"-c",
			line
		]);
	}
	async runCommand(params) {
		const id = "cmd_" + Math.random().toString(36).slice(2, 12);
		const startedAt = now();
		const baseCmd = {
			id,
			name: params.command,
			args: params.args,
			cwd: params.cwd ?? this.cwd,
			sessionId: this.sessionId,
			exitCode: null,
			startedAt
		};
		if (params.wait) {
			const stored$1 = {
				data: baseCmd,
				stdout: "",
				stderr: ""
			};
			this.commands.set(id, stored$1);
			return {
				command: baseCmd,
				finished: (async () => {
					const r = await this.exec(params.command, params.args, params.cwd, params.env);
					stored$1.stdout = r.stdout;
					stored$1.stderr = r.stderr;
					const fin = {
						...baseCmd,
						exitCode: r.exitCode
					};
					stored$1.finished = fin;
					return fin;
				})()
			};
		}
		const stored = {
			data: baseCmd,
			stdout: "",
			stderr: ""
		};
		this.commands.set(id, stored);
		this.exec(params.command, params.args, params.cwd, params.env).then((r) => {
			stored.stdout = r.stdout;
			stored.stderr = r.stderr;
			stored.finished = {
				...baseCmd,
				exitCode: r.exitCode
			};
		});
		return { json: { command: baseCmd } };
	}
	async getCommand(params) {
		const stored = this.commands.get(params.cmdId);
		if (!stored) throw new Error(`webix: unknown command ${params.cmdId}`);
		if (params.wait && stored.finished) return parsed({ command: stored.finished });
		return parsed({ command: stored.finished ?? stored.data });
	}
	async killCommand(params) {
		const stored = this.commands.get(params.commandId);
		return parsed({ command: stored?.finished ?? stored?.data ?? null });
	}
	getLogs(params) {
		const stored = this.commands.get(params.cmdId);
		const gen = (async function* () {
			if (!stored) return;
			const emit = function* (text, stream) {
				for (const line of text.split(/(?<=\n)/)) if (line) yield {
					stream,
					data: line
				};
			};
			yield* emit(stored.stdout, "stdout");
			yield* emit(stored.stderr, "stderr");
		})();
		return Object.assign(gen, {
			[Symbol.dispose]() {},
			close() {}
		});
	}
	async mkDir(params) {
		await this.ensureBooted();
		const full = normalizePath({
			filePath: params.path,
			cwd: params.cwd ?? this.cwd,
			extractDir: "/"
		});
		this.mkdirp("/" + full);
		return parsed({});
	}
	mkdirp(p) {
		const fs = this.host.fs;
		let cur = "";
		for (const seg of p.split("/").filter(Boolean)) {
			cur += "/" + seg;
			try {
				fs.mkdir(cur, 493);
			} catch {}
		}
	}
	getFileWriter(params) {
		const files = [];
		const client = this;
		const writer = {
			async addFile(file) {
				const content = typeof file.content === "string" ? new TextEncoder().encode(file.content) : file.content;
				files.push({
					name: file.name,
					content,
					mode: file.mode
				});
			},
			end() {}
		};
		const response = (async () => {
			await client.ensureBooted();
			const fs = client.host.fs;
			for (const f of files) {
				const full = "/" + f.name.replace(/^\/+/, "");
				client.mkdirp(full.replace(/\/[^/]*$/, "") || "/");
				try {
					fs.unlink(full);
				} catch {}
				const s = fs.open(full, "w+");
				if (f.content.length) fs.write(s, f.content, 0, f.content.length, 0);
				fs.close(s);
				fs.chmod(full, f.mode ?? 420);
			}
			return parsed({});
		});
		return {
			writer,
			response: response()
		};
	}
	async writeFiles(params) {
		const { writer, response } = this.getFileWriter({ extractDir: params.extractDir });
		for (const file of params.files) await writer.addFile({
			name: normalizePath({
				filePath: file.path,
				extractDir: params.extractDir,
				cwd: params.cwd
			}),
			content: file.content,
			mode: file.mode
		});
		writer.end();
		await response;
		return parsed({});
	}
	async readFile(params) {
		await this.ensureBooted();
		const full = "/" + normalizePath({
			filePath: params.path,
			cwd: params.cwd ?? this.cwd,
			extractDir: "/"
		});
		let bytes;
		try {
			bytes = this.host.fs.readFile(full);
		} catch {
			return null;
		}
		return new ReadableStream({ start(controller) {
			controller.enqueue(bytes);
			controller.close();
		} });
	}
	async createSnapshot(_params) {
		await this.ensureBooted();
		const blink = this.host.snapshot();
		const id = "snap_" + Math.random().toString(36).slice(2, 12);
		const meta = {
			id,
			sourceSessionId: this.sessionId,
			region: "local",
			status: "created",
			sizeBytes: blink.memory.byteLength,
			createdAt: now(),
			updatedAt: now()
		};
		this.snapshots.set(id, {
			meta,
			blink
		});
		this.status = "running";
		return parsed({
			snapshot: meta,
			session: this.sessionMeta()
		});
	}
	async getSnapshot(params) {
		const s = this.snapshots.get(params.snapshotId);
		if (!s) throw new Error(`webix: unknown snapshot ${params.snapshotId}`);
		return parsed({ snapshot: s.meta });
	}
	async deleteSnapshot(params) {
		const s = this.snapshots.get(params.snapshotId);
		if (!s) throw new Error(`webix: unknown snapshot ${params.snapshotId}`);
		s.meta.status = "deleted";
		this.snapshots.delete(params.snapshotId);
		return parsed({ snapshot: s.meta });
	}
	async listSnapshots() {
		return parsed({
			snapshots: [...this.snapshots.values()].map((s) => s.meta),
			pagination: {
				count: this.snapshots.size,
				next: null
			}
		});
	}
	async getSnapshotTree() {
		return parsed({
			snapshots: [],
			pagination: {
				count: 0,
				next: null
			}
		});
	}
	/** Restore a previously captured snapshot into the live host. */
	async restoreSnapshot(snapshotId) {
		await this.ensureBooted();
		const s = this.snapshots.get(snapshotId);
		if (!s) throw new Error(`webix: unknown snapshot ${snapshotId}`);
		this.host.restore(s.blink);
	}
	/**
	* Run an X server (Xvfb) and an X client concurrently in-page (each on its
	* own worker pthread), talking over blink's in-process AF_UNIX layer.
	* Resolves when the client exits; the server stays RUNNING. Bytes are read
	* from the guest FS paths if not supplied.
	*/
	async runConcurrent(server, client, opts) {
		await this.ensureBooted();
		const fs = this.host.fs;
		const sBytes = server.bytes ?? fs.readFile(server.path);
		const cBytes = client.bytes ?? fs.readFile(client.path);
		return this.host.runConcurrent({
			bytes: sBytes,
			argv: server.argv,
			progname: server.progname
		}, {
			bytes: cBytes,
			argv: client.argv,
			progname: client.progname
		}, opts);
	}
	/**
	* Start a PERSISTENT X server (Xvfb) in-page that keeps serving across
	* multiple client launches (unlike one-shot runConcurrent). Returns once the
	* server VM is spawned + its proxy pump is running; the framebuffer updates
	* continuously so the host can blit it on rAF. Bytes read from the guest FS
	* path if not supplied.
	*/
	async startXServer(server) {
		await this.ensureBooted();
		const fs = this.host.fs;
		const sBytes = server.bytes ?? fs.readFile(server.path);
		return this.host.startXServer({
			bytes: sBytes,
			argv: server.argv,
			progname: server.progname
		});
	}
	/**
	* Launch an X client against the running persistent X server. Resolves with
	* the client's exit; the server keeps serving.
	*/
	async launchXClient(client) {
		await this.ensureBooted();
		const fs = this.host.fs;
		const cBytes = client.bytes ?? fs.readFile(client.path);
		return this.host.launchXClient({
			bytes: cBytes,
			argv: client.argv,
			progname: client.progname,
			timeoutMs: client.timeoutMs
		});
	}
	/** Stop the persistent X server's proxy pump. */
	async stopX() {
		await this.ensureBooted();
		this.host.stopX();
	}
	/** Whether a persistent X server is currently running in-page. */
	async xRunning() {
		await this.ensureBooted();
		return this.host.xRunning();
	}
	/** Attach a canvas to the guest framebuffer (rAF blit + input forwarding). */
	async pkgSearch(query, opts) {
		await this.ensureBooted();
		return this.host.pkgSearch(query, opts);
	}
	async pkgInfo(name) {
		await this.ensureBooted();
		return this.host.pkgInfo(name);
	}
	async pkgInstall(name) {
		await this.ensureBooted();
		return this.host.pkgInstall(name);
	}
	async pkgRemove(name) {
		await this.ensureBooted();
		return this.host.pkgRemove(name);
	}
	async pkgInstalled() {
		await this.ensureBooted();
		return this.host.pkgInstalled();
	}
	async persistDir(guestDir) {
		await this.ensureBooted();
		return this.host.persistDir(guestDir);
	}
	async syncPersist() {
		await this.ensureBooted();
		return this.host.syncPersist();
	}
	async attachDisplay(canvas, opts) {
		await this.ensureBooted();
		return this.host.attachDisplay(canvas, opts);
	}
	/** Push one input event (key/mouse) into the guest input device. */
	async pushInput(evt) {
		await this.ensureBooted();
		return this.host.pushInput(evt);
	}
	/** Current framebuffer geometry, or null if no guest registered one. */
	async displayInfo() {
		await this.ensureBooted();
		return this.host.fbInfo();
	}
	/**
	* Snapshot the guest framebuffer pixels as a contiguous RGBA Uint8ClampedArray
	* (assembled page-by-page by the host), or null if no guest registered a
	* framebuffer. For callers that drive their own blit loop (e.g. a render-once
	* GUI app) instead of attachDisplay.
	*/
	async displayPixels() {
		await this.ensureBooted();
		return this.host.fbView();
	}
	/** Capability flags of the running Blink build. */
	async capabilities() {
		await this.ensureBooted();
		return this.host.capabilities;
	}
	async listSessions() {
		return parsed({
			sessions: [this.sessionMeta()],
			pagination: {
				count: 1,
				next: null
			}
		});
	}
	async listSandboxes() {
		return parsed({
			sandboxes: [this.sandboxMeta()],
			pagination: {
				count: 1,
				next: null
			}
		});
	}
	async updateSandbox(params) {
		if (params.runtime) this.runtime = params.runtime;
		if (params.cwd) this.cwd = params.cwd;
		return parsed({
			sandbox: this.sandboxMeta(),
			routes: []
		});
	}
	async deleteSandbox() {
		this.status = "stopped";
		this.host.stop();
		return parsed({
			sandbox: this.sandboxMeta(),
			routes: []
		});
	}
	async updateNetworkPolicy(_params) {
		throw new NotSupportedError("Network policies are unavailable: the in-browser sandbox has no networking (Blink build is NOSOCK).");
	}
};

//#endregion
export { NotSupportedError, WebixApiClient };
//# sourceMappingURL=webix-client.js.map