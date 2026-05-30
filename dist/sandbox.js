import { sleepWithSignal } from "./utils/browser-primitives.js";
import { NotSupportedError, WebixApiClient } from "./api-client/webix-client.js";
import "./api-client/index.js";
import { APIError } from "./api-client/api-error.js";
import { fromAPINetworkPolicy } from "./utils/network-policy.js";
import { Session } from "./session.js";
import { FileSystem } from "./filesystem.js";

//#region src/sandbox.ts
function isSandboxStoppedError(err) {
	return err instanceof APIError && err.response.status === 410;
}
function isSandboxStoppingError(err) {
	return err instanceof APIError && err.response.status === 422 && err.json?.error?.code === "sandbox_stopping";
}
function isSandboxSnapshottingError(err) {
	return err instanceof APIError && err.response.status === 422 && err.json?.error?.code === "sandbox_snapshotting";
}
/**
* A Sandbox is a persistent, isolated Linux MicroVMs to run commands in.
* Use {@link Sandbox.create} or {@link Sandbox.get} to construct.
* @hideconstructor
*/
var Sandbox = class {
	/**
	* Return the in-browser sandbox client bound to this sandbox's live host.
	* @internal
	*/
	async ensureClient() {
		if (this._client) return this._client;
		throw new Error("Sandbox is not attached to a live in-browser host (was it structurally cloned?).");
	}
	/**
	* The name of this sandbox.
	*/
	get name() {
		return this.sandbox.name;
	}
	/**
	* Routes from ports to subdomains.
	* @hidden
	*/
	get routes() {
		return this.currentSession().routes;
	}
	/**
	* Whether the sandbox persists the state.
	*/
	get persistent() {
		return this.sandbox.persistent;
	}
	/**
	* The region this sandbox runs in.
	*/
	get region() {
		return this.sandbox.region;
	}
	/**
	* Number of virtual CPUs allocated.
	*/
	get vcpus() {
		return this.sandbox.vcpus;
	}
	/**
	* Memory allocated in MB.
	*/
	get memory() {
		return this.sandbox.memory;
	}
	/** Runtime identifier (e.g. "node24", "python3.13"). */
	get runtime() {
		return this.sandbox.runtime;
	}
	/**
	* Cumulative egress bytes across all sessions.
	*/
	get totalEgressBytes() {
		return this.sandbox.totalEgressBytes;
	}
	/**
	* Cumulative ingress bytes across all sessions.
	*/
	get totalIngressBytes() {
		return this.sandbox.totalIngressBytes;
	}
	/**
	* Cumulative active CPU duration in milliseconds across all sessions.
	*/
	get totalActiveCpuDurationMs() {
		return this.sandbox.totalActiveCpuDurationMs;
	}
	/**
	* Cumulative wall-clock duration in milliseconds across all sessions.
	*/
	get totalDurationMs() {
		return this.sandbox.totalDurationMs;
	}
	/**
	* When this sandbox was last updated.
	*/
	get updatedAt() {
		return new Date(this.sandbox.updatedAt);
	}
	/**
	* When the sandbox status was last updated.
	*/
	get statusUpdatedAt() {
		return this.sandbox.statusUpdatedAt ? new Date(this.sandbox.statusUpdatedAt) : void 0;
	}
	/**
	* When this sandbox was created.
	*/
	get createdAt() {
		return new Date(this.sandbox.createdAt);
	}
	/**
	* Interactive port.
	*/
	get interactivePort() {
		return this.currentSession().interactivePort;
	}
	/**
	* The status of the current session.
	*/
	get status() {
		return this.currentSession().status;
	}
	/**
	* The default timeout of this sandbox in milliseconds.
	*/
	get timeout() {
		return this.sandbox.timeout;
	}
	/**
	* Key-value tags attached to the sandbox.
	*/
	get tags() {
		return this.sandbox.tags;
	}
	/**
	* The default network policy of this sandbox.
	*/
	get networkPolicy() {
		return this.sandbox.networkPolicy ? fromAPINetworkPolicy(this.sandbox.networkPolicy) : void 0;
	}
	/**
	* If the session was created from a snapshot, the ID of that snapshot.
	*/
	get sourceSnapshotId() {
		return this.currentSession().sourceSnapshotId;
	}
	/**
	* The current snapshot ID of this sandbox, if any.
	*/
	get currentSnapshotId() {
		return this.sandbox.currentSnapshotId;
	}
	/**
	* The default snapshot expiration in milliseconds, if set.
	*/
	get snapshotExpiration() {
		return this.sandbox.snapshotExpiration;
	}
	/**
	* The snapshot retention policy (`keep-last-snapshots`) currently configured
	* on this sandbox, if any.
	*/
	get keepLastSnapshots() {
		return this.sandbox.keepLastSnapshots;
	}
	/**
	* The amount of CPU used by the session. Only reported once the VM is stopped.
	*/
	get activeCpuUsageMs() {
		return this.currentSession().activeCpuUsageMs;
	}
	/**
	* The amount of network data used by the session. Only reported once the VM is stopped.
	*/
	get networkTransfer() {
		return this.currentSession().networkTransfer;
	}
	/**
	* Allow to get a list of sandboxes for a team narrowed to the given params.
	* It returns both the sandboxes and the pagination metadata to allow getting
	* the next page of results.
	*
	* The returned object is async-iterable to auto-paginate through all pages:
	*
	* ```ts
	* const result = await Sandbox.list({ namePrefix: "ci-" });
	* for await (const sandbox of result) { ... }
	* // or: await result.toArray();
	* // or: for await (const page of result.pages()) { ... }
	* ```
	*/
	static async list() {
		throw new NotSupportedError("Sandbox.list is unavailable in the self-contained backend: there is no remote account registry. Each in-browser sandbox exists only in the page that created it.");
	}
	/**
	* Create a new sandbox.
	*
	* @param params - Creation parameters and optional credentials.
	* @returns A promise resolving to the created {@link Sandbox}.
	* @example
	* <caption>Create a sandbox with default options</caption>
	* const sandbox = await Sandbox.create();
	*
	* @example
	* <caption>Create a sandbox and drop it in the end of the block</caption>
	* async function fn() {
	*   await using const sandbox = await Sandbox.create();
	*   // Sandbox automatically stopped at the end of the lexical scope
	* }
	*/
	static async create(params) {
		if (params?.source) throw new NotSupportedError("Sandbox sources (git/tarball/snapshot URLs) are not supported by the in-browser backend; seed files with writeFiles() instead.");
		const runtime = params && "runtime" in params ? params.runtime : void 0;
		const client = new WebixApiClient({
			onProgress: params?.onProgress,
			wasmUrl: params?.wasmUrl,
			glueUrl: params?.glueUrl,
			rootfsUrl: params?.rootfsUrl,
			rootfsTarBytes: params?.rootfsTarBytes,
			wasmPath: params?.wasmPath,
			gluePath: params?.gluePath,
			name: params?.name,
			runtime
		});
		const response = await client.createSandbox({
			name: params?.name,
			runtime
		});
		return new DisposableSandbox({
			client,
			session: response.json.session,
			sandbox: response.json.sandbox,
			routes: response.json.routes,
			onResume: params?.onResume
		});
	}
	/**
	* Forking, named retrieval, and get-or-create are unavailable in the
	* self-contained backend: there is no remote registry of sandboxes. Each
	* in-browser sandbox exists only within the page that called create().
	*/
	static async fork() {
		throw new NotSupportedError("Sandbox.fork is unavailable in the self-contained in-browser backend.");
	}
	static async get() {
		throw new NotSupportedError("Sandbox.get is unavailable in the self-contained in-browser backend; keep the Sandbox returned by create().");
	}
	static async getOrCreate() {
		throw new NotSupportedError("Sandbox.getOrCreate is unavailable in the self-contained in-browser backend; use create().");
	}
	/**
	* Create a new Sandbox instance.
	*
	* @param params.client - Optional API client. If not provided, will be lazily created using global credentials.
	* @param params.routes - Port-to-subdomain mappings for exposed ports
	* @param params.sandbox - Sandbox snapshot metadata
	*/
	constructor({ client, routes, session, sandbox, onResume }) {
		this._client = null;
		this.resumePromise = null;
		this._client = client ?? null;
		if (session) this.session = new Session({
			client,
			routes,
			session
		});
		this.sandbox = sandbox;
		this.onResume = onResume;
		this.fs = new FileSystem(this);
	}
	/**
	* Get the current session (the running VM) for this sandbox.
	*
	* @returns The {@link Session} instance.
	*/
	currentSession() {
		if (!this.session) throw new Error("No active session. Run a command or call resume first.");
		return this.session;
	}
	/**
	* Resume this sandbox by creating a new session via `getSandbox`.
	*/
	async resume(signal) {
		if (!this.resumePromise) this.resumePromise = this.doResume(signal).finally(() => {
			this.resumePromise = null;
		});
		return this.resumePromise;
	}
	async doResume(_signal) {
		const client = await this.ensureClient();
		const response = await client.getSandbox();
		this.session = new Session({
			client,
			routes: response.json.routes,
			session: response.json.session
		});
	}
	/**
	* Poll until the current session reaches a terminal state, then resume.
	*/
	async waitForStopAndResume(signal) {
		"use step";
		const client = await this.ensureClient();
		const pollingInterval = 500;
		let status = this.session.status;
		while (status === "stopping" || status === "snapshotting") {
			await sleepWithSignal(pollingInterval, signal);
			const poll = await client.getSession({
				sessionId: this.session.sessionId,
				signal
			});
			this.session = new Session({
				client,
				routes: poll.json.routes,
				session: poll.json.session
			});
			status = poll.json.session.status;
		}
		await this.resume(signal);
	}
	/**
	* Execute `fn`, and if the session is stopped/stopping/snapshotting, resume and retry.
	*/
	async withResume(fn, signal) {
		if (!this.session) await this.resume(signal);
		try {
			return await fn();
		} catch (err) {
			if (isSandboxStoppedError(err)) {
				await this.resume(signal);
				return fn();
			}
			if (isSandboxStoppingError(err) || isSandboxSnapshottingError(err)) {
				await this.waitForStopAndResume(signal);
				return fn();
			}
			throw err;
		}
	}
	async runCommand(commandOrParams, args, opts) {
		"use step";
		const signal = typeof commandOrParams === "string" ? opts?.signal : commandOrParams.signal;
		return this.withResume(() => this.session.runCommand(commandOrParams, args, opts), signal);
	}
	/**
	* Internal helper to start a command in the sandbox.
	*
	* @param params - Command execution parameters.
	* @returns A {@link Command} or {@link CommandFinished}, depending on `detached`.
	* @internal
	*/
	async getCommand(cmdId, opts) {
		"use step";
		return this.withResume(() => this.session.getCommand(cmdId, opts), opts?.signal);
	}
	/**
	* Create a directory in the filesystem of this sandbox.
	*
	* @param path - Path of the directory to create
	* @param opts - Optional parameters.
	* @param opts.signal - An AbortSignal to cancel the operation.
	*/
	async mkDir(path, opts) {
		"use step";
		return this.withResume(() => this.session.mkDir(path, opts), opts?.signal);
	}
	/**
	* Read a file from the filesystem of this sandbox as a stream.
	*
	* @param file - File to read, with path and optional cwd
	* @param opts - Optional parameters.
	* @param opts.signal - An AbortSignal to cancel the operation.
	* @returns A promise that resolves to a ReadableStream containing the file contents, or null if file not found
	*/
	async readFile(file, opts) {
		return this.withResume(() => this.session.readFile(file, opts), opts?.signal);
	}
	/**
	* Read a file from the filesystem of this sandbox as a Buffer.
	*
	* @param file - File to read, with path and optional cwd
	* @param opts - Optional parameters.
	* @param opts.signal - An AbortSignal to cancel the operation.
	* @returns A promise that resolves to the file contents as a Buffer, or null if file not found
	*/
	async readFileToBuffer(file, opts) {
		return this.withResume(() => this.session.readFileToBuffer(file, opts), opts?.signal);
	}
	/**
	* Download a file from the sandbox to the local filesystem.
	*
	* @param src - Source file on the sandbox, with path and optional cwd
	* @param dst - Destination file on the local machine, with path and optional cwd
	* @param opts - Optional parameters.
	* @param opts.mkdirRecursive - If true, create parent directories for the destination if they don't exist.
	* @param opts.signal - An AbortSignal to cancel the operation.
	* @returns The absolute path to the written file, or null if the source file was not found
	*/
	async downloadFile(src, dst, opts) {
		"use step";
		return this.withResume(() => this.session.downloadFile(src, dst, opts), opts?.signal);
	}
	/**
	* Write files to the filesystem of this sandbox.
	* Defaults to writing to /vercel/sandbox unless an absolute path is specified.
	* Writes files using the `vercel-sandbox` user.
	*
	* @param files - Array of files with path, content, and optional mode (permissions)
	* @param opts - Optional parameters.
	* @param opts.signal - An AbortSignal to cancel the operation.
	* @returns A promise that resolves when the files are written
	*
	* @example
	* // Write an executable script
	* await sandbox.writeFiles([
	*   { path: "/usr/local/bin/myscript", content: "#!/bin/bash\necho hello", mode: 0o755 }
	* ]);
	*/
	async writeFiles(files, opts) {
		"use step";
		return this.withResume(() => this.session.writeFiles(files, opts), opts?.signal);
	}
	/**
	* Get the public domain of a port of this sandbox.
	*
	* @param p - Port number to resolve
	* @returns A full domain (e.g. `https://subdomain.vercel.run`)
	* @throws If the port has no associated route
	*/
	domain(p) {
		return this.currentSession().domain(p);
	}
	/**
	* Attach an HTML canvas to this sandbox's framebuffer. Starts a
	* requestAnimationFrame loop that blits the guest's RGBA framebuffer
	* (published via the in-guest display producer) zero-copy to the canvas, and
	* forwards canvas keyboard/mouse events into the guest input device.
	*
	* Self-contained in-browser backend only: there is no remote display.
	*
	* @param canvas - An HTMLCanvasElement to paint into.
	* @param opts.fpsCap - Max paint rate (default 60).
	* @returns A controller with `stats()` and `stop()`.
	*
	* @example
	* const sandbox = await Sandbox.create();
	* await sandbox.runCommand("/usr/bin/Xfbdev", [":0"], { detached: true });
	* const display = await sandbox.attachDisplay(document.querySelector("canvas"));
	* // ... later: display.stop();
	*/
	async attachDisplay(canvas, opts) {
		return (await this.ensureClient()).attachDisplay(canvas, opts);
	}
	/**
	* Mount an IDBFS-backed persistent directory (default `/persist`) and load it
	* from IndexedDB. Files written under it survive a page reload once
	* {@link syncPersist} flushes them. In-browser only.
	*
	* @example
	* await sandbox.persistDir("/persist");
	* await sandbox.fs.writeFile("/persist/notes.txt", "hi");
	* await sandbox.syncPersist(); // persisted across reloads
	*/
	/**
	* Browse the in-page Alpine apk catalog (merged APKINDEX), replacing the
	* removed remote /packages service. `gui:true` filters to apps that depend on
	* an X/display lib. Returns `{packages, total}` for pagination.
	*/
	async pkgSearch(query, opts) {
		return (await this.ensureClient()).pkgSearch(query, opts);
	}
	/** Repo metadata for one apk package (version, summary, depends, repo). */
	async pkgInfo(name) {
		return (await this.ensureClient()).pkgInfo(name);
	}
	/** Install an apk package (+ deps) into the guest FS, in-page. */
	async pkgInstall(name) {
		return (await this.ensureClient()).pkgInstall(name);
	}
	/** Remove an installed apk package (unlink its files + drop the db entry). */
	async pkgRemove(name) {
		return (await this.ensureClient()).pkgRemove(name);
	}
	/** List packages installed via the in-page apk layer. */
	async pkgInstalled() {
		return (await this.ensureClient()).pkgInstalled();
	}
	async persistDir(guestDir) {
		return (await this.ensureClient()).persistDir(guestDir);
	}
	/** Flush the IDBFS-mounted persistent dir to IndexedDB. */
	async syncPersist() {
		return (await this.ensureClient()).syncPersist();
	}
	/**
	* Run an X server (e.g. Xvfb) and an X client concurrently in-page, each on
	* its own worker pthread, talking over the in-process AF_UNIX layer (no
	* sockets, no network). Resolves when the client exits; the server is left
	* running. Provide each program as raw `bytes` or a guest-FS `path`.
	*
	* @example
	* const r = await sandbox.runConcurrent(
	*   { path: "/usr/bin/Xvfb", argv: [":99","-screen","0","640x480x16","-ac","-noreset","-nolock"] },
	*   { path: "/usr/bin/xdpyinfo", argv: ["-display",":99"] },
	* );
	* console.log(r.client.exitCode, r.client.stdout);
	*/
	async runConcurrent(server, client, opts) {
		return (await this.ensureClient()).runConcurrent(server, client, opts);
	}
	/**
	* Start a PERSISTENT X server (e.g. Xvfb) in-page that keeps serving across
	* multiple `launchXClient` calls (unlike one-shot `runConcurrent`). The server
	* VM stays on its worker pthread with an always-on proxy pump so its
	* framebuffer keeps updating; blit it via `displayPixels()`/`attachDisplay()`
	* on rAF meanwhile. Resolves once the server is spawned.
	*
	* @example
	* await sandbox.startXServer({ path: "/usr/bin/Xvfb", argv: [":99","-screen","0","800x600x16","-ac","-noreset","-nolock"] });
	* await sandbox.launchXClient({ path: "/usr/bin/xclock", argv: ["-display",":99"] });
	*/
	async startXServer(server) {
		return (await this.ensureClient()).startXServer(server);
	}
	/**
	* Launch an X client against the running persistent X server. Resolves with
	* the client's exit when it exits; the server keeps serving.
	*/
	async launchXClient(client) {
		return (await this.ensureClient()).launchXClient(client);
	}
	/** Stop the persistent X server's proxy pump. */
	async stopX() {
		return (await this.ensureClient()).stopX();
	}
	/** Whether a persistent X server is currently running in-page. */
	async xRunning() {
		return (await this.ensureClient()).xRunning();
	}
	/**
	* Push a single input event into the guest input device (host -> guest).
	*
	* @param evt - `{ type: "key"|"motion"|"button", code?, button?, x?, y?, down? }`.
	* @returns `false` if the running wasm predates the input device.
	*/
	async pushInput(evt) {
		return (await this.ensureClient()).pushInput(evt);
	}
	/**
	* Current framebuffer geometry the guest published, or `null` if none yet.
	*/
	async displayInfo() {
		return (await this.ensureClient()).displayInfo();
	}
	/**
	* Snapshot the guest framebuffer pixels as a contiguous RGBA buffer
	* (assembled page-by-page), or `null` if no guest registered a framebuffer.
	* For driving a custom blit loop instead of {@link attachDisplay}.
	*/
	async displayPixels() {
		return (await this.ensureClient()).displayPixels();
	}
	/**
	* Capability flags of the running Blink build (threads, sockets, framebuffer,
	* pipe, fork, vectorISA, ...).
	*/
	async capabilities() {
		return (await this.ensureClient()).capabilities();
	}
	/**
	* Stop the sandbox.
	*
	* @param opts - Optional parameters.
	* @param opts.signal - An AbortSignal to cancel the operation.
	* @returns The final session state after stopping, with optional snapshot metadata.
	*/
	async stop(opts) {
		"use step";
		if (!this.session) throw new Error("No active session to stop.");
		const { session, sandbox, snapshot } = await this.session.stop(opts);
		if (sandbox) this.sandbox = sandbox;
		return Object.assign(session, { snapshot });
	}
	/**
	* Update the network policy for this sandbox.
	*
	* @deprecated Use {@link Sandbox.update} instead.
	*
	* @param networkPolicy - The new network policy to apply.
	* @param opts - Optional parameters.
	* @param opts.signal - An AbortSignal to cancel the operation.
	* @returns A promise that resolves when the network policy is updated.
	*
	* @example
	* // Restrict to specific domains
	* await sandbox.updateNetworkPolicy({
	*   allow: ["*.npmjs.org", "github.com"],
	* });
	*
	* @example
	* // Inject credentials with per-domain transformers
	* await sandbox.updateNetworkPolicy({
	*   allow: {
	*     "ai-gateway.vercel.sh": [{
	*       transform: [{
	*         headers: { authorization: "Bearer ..." }
	*       }]
	*     }],
	*     "*": []
	*   }
	* });
	*
	* @example
	* // Deny all network access
	* await sandbox.updateNetworkPolicy("deny-all");
	*/
	async updateNetworkPolicy(networkPolicy, opts) {
		"use step";
		await this.withResume(() => this.session.update({ networkPolicy }, opts), opts?.signal);
		return this.session.networkPolicy;
	}
	/**
	* Extend the timeout of the sandbox by the specified duration.
	*
	* This allows you to extend the lifetime of a sandbox up until the maximum
	* execution timeout for your plan.
	*
	* @param duration - The duration in milliseconds to extend the timeout by
	* @param opts - Optional parameters.
	* @param opts.signal - An AbortSignal to cancel the operation.
	* @returns A promise that resolves when the timeout is extended
	*
	* @example
	* const sandbox = await Sandbox.create({ timeout: ms('10m') });
	* // Extends timeout by 5 minutes, to a total of 15 minutes.
	* await sandbox.extendTimeout(ms('5m'));
	*/
	async extendTimeout(duration, opts) {
		"use step";
		return this.withResume(() => this.session.extendTimeout(duration, opts), opts?.signal);
	}
	/**
	* Create a snapshot from this currently running sandbox. New sandboxes can
	* then be created from this snapshot using {@link Sandbox.createFromSnapshot}.
	*
	* Note: this sandbox will be stopped as part of the snapshot creation process.
	*
	* @param opts - Optional parameters.
	* @param opts.expiration - Optional expiration time in milliseconds. Use 0 for no expiration at all.
	* @param opts.signal - An AbortSignal to cancel the operation.
	* @returns A promise that resolves to the Snapshot instance
	*/
	async snapshot(opts) {
		"use step";
		return this.withResume(() => this.session.snapshot(opts), opts?.signal);
	}
	/**
	* Update the sandbox configuration.
	*
	* When `ports` is provided, it is treated as the full desired port list:
	* any currently exposed port omitted from the array will be deregistered.
	*
	* @param params - Fields to update.
	* @param opts - Optional abort signal.
	*/
	async update(params, opts) {
		"use step";
		const client = await this.ensureClient();
		if (params.resources?.vcpus) params.resources.vcpus, params.resources.vcpus * 2048;
		const response = await client.updateSandbox({ runtime: params && "runtime" in params ? params.runtime : void 0 });
		this.sandbox = response.json.sandbox;
		if (params.ports !== void 0 && response.json.routes) this.session?.updateRoutes(response.json.routes);
		if (params.networkPolicy) try {
			return await this.session?.update({ networkPolicy: params.networkPolicy }, opts);
		} catch (err) {
			if (isSandboxStoppedError(err) || isSandboxStoppingError(err)) return;
			throw err;
		}
	}
	/**
	* Delete this sandbox.
	*
	* After deletion the instance becomes inert — all further API calls will
	* throw immediately.
	*/
	async delete(opts) {
		"use step";
		await (await this.ensureClient()).deleteSandbox();
	}
	/**
	* List sessions (VMs) that have been created for this sandbox.
	*
	* @param params - Optional pagination parameters.
	* @returns The list of sessions and pagination metadata.
	*/
	async listSessions(params) {
		"use step";
		return (await (await this.ensureClient()).listSessions()).json;
	}
	/**
	* List snapshots that belong to this sandbox.
	*
	* @param params - Optional pagination parameters.
	* @returns The list of snapshots and pagination metadata.
	*/
	async listSnapshots(params) {
		"use step";
		return (await (await this.ensureClient()).listSnapshots()).json;
	}
};
/**
* A {@link Sandbox} that can automatically be disposed using a `await using` statement.
*
* @example
* {
*   await using const sandbox = await Sandbox.create();
* }
* // Sandbox is automatically stopped here
*/
var DisposableSandbox = class extends Sandbox {
	async [Symbol.asyncDispose]() {
		await this.stop();
	}
};

//#endregion
export { Sandbox };
//# sourceMappingURL=sandbox.js.map