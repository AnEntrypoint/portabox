import { WebixHostOptions } from "./webix/host.cjs";
import { SandboxMetaData, SandboxRouteData, SessionMetaData, SnapshotMetadata } from "./api-client/validators.cjs";
import { WebixApiClient } from "./api-client/webix-client.cjs";
import "./api-client/index.cjs";
import { RUNTIMES } from "./constants.cjs";
import { Command, CommandFinished } from "./command.cjs";
import { Snapshot } from "./snapshot.cjs";
import { NetworkPolicy, NetworkPolicyKeyValueMatcher, NetworkPolicyMatch, NetworkPolicyMatcher } from "./network-policy.cjs";
import { SandboxSnapshot } from "./utils/sandbox-snapshot.cjs";
import { RunCommandParams, Session } from "./session.cjs";
import { FileSystem } from "./filesystem.cjs";
import * as zod0 from "zod";

//#region src/sandbox.d.ts
/** @inline */
interface BaseCreateSandboxParams extends WebixHostOptions {
  /**
   * The name of the sandbox. If omitted, a random name will be generated.
   */
  name?: string;
  /**
   * The source of the sandbox.
   *
   * Omit this parameter start a sandbox without a source.
   *
   * For git sources:
   * - `depth`: Creates shallow clones with limited commit history (minimum: 1)
   * - `revision`: Clones and checks out a specific commit, branch, or tag
   */
  source?: {
    type: "git";
    url: string;
    depth?: number;
    revision?: string;
  } | {
    type: "git";
    url: string;
    username: string;
    password: string;
    depth?: number;
    revision?: string;
  } | {
    type: "tarball";
    url: string;
  };
  /**
   * Array of port numbers to expose from the sandbox. Sandboxes can
   * expose up to 4 ports.
   */
  ports?: number[];
  /**
   * Timeout in milliseconds before the sandbox auto-terminates.
   */
  timeout?: number;
  /**
   * Resources to allocate to the sandbox.
   *
   * Your sandbox will get the amount of vCPUs you specify here and
   * 2048 MB of memory per vCPU.
   */
  resources?: {
    vcpus: number;
  };
  /**
   * The runtime of the sandbox, currently only `node24`, `node22`, `node26` and `python3.13` are supported.
   * If not specified, the default runtime `node24` will be used.
   */
  runtime?: RUNTIMES | (string & {});
  /**
   * Network policy to define network restrictions for the sandbox.
   * Defaults to full internet access if not specified.
   */
  networkPolicy?: NetworkPolicy;
  /**
   * Default environment variables for the sandbox.
   * These are inherited by all commands unless overridden with
   * the `env` option in `runCommand`.
   *
   * @example
   * const sandbox = await Sandbox.create({
   *   env: { NODE_ENV: "production", API_KEY: "secret" },
   * });
   * // All commands will have NODE_ENV and API_KEY set
   * await sandbox.runCommand("node", ["app.js"]);
   */
  env?: Record<string, string>;
  /**
   * Key-value tags to associate with the sandbox. Maximum 5 tags.
   * @example { env: "staging", team: "infra" }
   */
  tags?: Record<string, string>;
  /**
   * An AbortSignal to cancel sandbox creation.
   */
  signal?: AbortSignal;
  /**
   * Enable or disable automatic restore of the filesystem between sessions.
   */
  persistent?: boolean;
  /**
   * Default snapshot expiration in milliseconds.
   * When set, snapshots created for this sandbox will expire after this duration.
   * Use `0` for no expiration.
   */
  snapshotExpiration?: number;
  /**
   * Retention policy that keeps only the N most recent snapshots of this
   * sandbox. Older snapshots are evicted when a new one is created.
   */
  keepLastSnapshots?: {
    /**
     * Number of snapshots to keep (1-10).
     */
    count: number;
    /**
     * Expiration in milliseconds applied to kept snapshots.
     * Use `0` for no expiration. Falls back to `snapshotExpiration` when omitted.
     */
    expiration?: number;
    /**
     * When `true` (the default), evicted snapshots are deleted immediately;
     * when `false`, they keep the default expiration.
     */
    deleteEvicted?: boolean;
  };
  /**
   * Called when the sandbox session is resumed (e.g., after a snapshot restore).
   * Use this to re-warm caches, restore transient state, or run other setup logic.
   */
  onResume?: (sandbox: Sandbox) => Promise<void>;
}
type CreateSandboxParams = BaseCreateSandboxParams | (Omit<BaseCreateSandboxParams, "runtime" | "source"> & {
  source: {
    type: "snapshot";
    snapshotId: string;
  };
});
/**
 * Serialized representation of a Sandbox for @workflow/serde.
 * Fields `metadata` and `routes` are the original wire format from main.
 * Fields `sandboxMetadata` and `projectId` are added for named-sandboxes.
 */
interface SerializedSandbox {
  metadata: SandboxSnapshot;
  routes: SandboxRouteData[];
  sandboxMetadata?: SandboxMetaData;
  projectId?: string;
}
/**
 * A Sandbox is a persistent, isolated Linux MicroVMs to run commands in.
 * Use {@link Sandbox.create} or {@link Sandbox.get} to construct.
 * @hideconstructor
 */
declare class Sandbox {
  private _client;
  /**
   * In-flight resume promise, used to deduplicate concurrent resume calls.
   */
  private resumePromise;
  /**
   * Internal Session instance for the current VM.
   */
  private session;
  /**
   * Internal metadata about the sandbox.
   */
  private sandbox;
  /**
   * Hook that will be executed when a new session is created during resume.
   */
  private readonly onResume?;
  /**
   * A `node:fs/promises`-compatible API for interacting with the sandbox filesystem.
   *
   * @example
   * const content = await sandbox.fs.readFile('/etc/hostname', 'utf8');
   * await sandbox.fs.writeFile('/tmp/hello.txt', 'Hello, world!');
   * const files = await sandbox.fs.readdir('/tmp');
   * const stats = await sandbox.fs.stat('/tmp/hello.txt');
   */
  readonly fs: FileSystem;
  /**
   * Return the in-browser sandbox client bound to this sandbox's live host.
   * @internal
   */
  private ensureClient;
  /**
   * The name of this sandbox.
   */
  get name(): string;
  /**
   * Routes from ports to subdomains.
   * @hidden
   */
  get routes(): SandboxRouteData[];
  /**
   * Whether the sandbox persists the state.
   */
  get persistent(): boolean;
  /**
   * The region this sandbox runs in.
   */
  get region(): string | undefined;
  /**
   * Number of virtual CPUs allocated.
   */
  get vcpus(): number | undefined;
  /**
   * Memory allocated in MB.
   */
  get memory(): number | undefined;
  /** Runtime identifier (e.g. "node24", "python3.13"). */
  get runtime(): string | undefined;
  /**
   * Cumulative egress bytes across all sessions.
   */
  get totalEgressBytes(): number | undefined;
  /**
   * Cumulative ingress bytes across all sessions.
   */
  get totalIngressBytes(): number | undefined;
  /**
   * Cumulative active CPU duration in milliseconds across all sessions.
   */
  get totalActiveCpuDurationMs(): number | undefined;
  /**
   * Cumulative wall-clock duration in milliseconds across all sessions.
   */
  get totalDurationMs(): number | undefined;
  /**
   * When this sandbox was last updated.
   */
  get updatedAt(): Date;
  /**
   * When the sandbox status was last updated.
   */
  get statusUpdatedAt(): Date | undefined;
  /**
   * When this sandbox was created.
   */
  get createdAt(): Date;
  /**
   * Interactive port.
   */
  get interactivePort(): number | undefined;
  /**
   * The status of the current session.
   */
  get status(): SessionMetaData["status"];
  /**
   * The default timeout of this sandbox in milliseconds.
   */
  get timeout(): number | undefined;
  /**
   * Key-value tags attached to the sandbox.
   */
  get tags(): Record<string, string> | undefined;
  /**
   * The default network policy of this sandbox.
   */
  get networkPolicy(): NetworkPolicy | undefined;
  /**
   * If the session was created from a snapshot, the ID of that snapshot.
   */
  get sourceSnapshotId(): string | undefined;
  /**
   * The current snapshot ID of this sandbox, if any.
   */
  get currentSnapshotId(): string | undefined;
  /**
   * The default snapshot expiration in milliseconds, if set.
   */
  get snapshotExpiration(): number | undefined;
  /**
   * The snapshot retention policy (`keep-last-snapshots`) currently configured
   * on this sandbox, if any.
   */
  get keepLastSnapshots(): {
    count: number;
    expiration?: number;
    deleteEvicted?: boolean;
  } | undefined;
  /**
   * The amount of CPU used by the session. Only reported once the VM is stopped.
   */
  get activeCpuUsageMs(): number | undefined;
  /**
   * The amount of network data used by the session. Only reported once the VM is stopped.
   */
  get networkTransfer(): {
    ingress: number;
    egress: number;
  } | undefined;
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
  static list(): Promise<never>;
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
  static create(params?: CreateSandboxParams): Promise<Sandbox & AsyncDisposable>;
  /**
   * Forking, named retrieval, and get-or-create are unavailable in the
   * self-contained backend: there is no remote registry of sandboxes. Each
   * in-browser sandbox exists only within the page that called create().
   */
  static fork(): Promise<never>;
  static get(): Promise<never>;
  static getOrCreate(): Promise<never>;
  /**
   * Create a new Sandbox instance.
   *
   * @param params.client - Optional API client. If not provided, will be lazily created using global credentials.
   * @param params.routes - Port-to-subdomain mappings for exposed ports
   * @param params.sandbox - Sandbox snapshot metadata
   */
  constructor({
    client,
    routes,
    session,
    sandbox,
    onResume
  }: {
    client?: WebixApiClient;
    routes: SandboxRouteData[];
    session?: SessionMetaData;
    sandbox: SandboxMetaData;
    onResume?: (sandbox: Sandbox) => Promise<void>;
  });
  /**
   * Get the current session (the running VM) for this sandbox.
   *
   * @returns The {@link Session} instance.
   */
  currentSession(): Session;
  /**
   * Resume this sandbox by creating a new session via `getSandbox`.
   */
  private resume;
  private doResume;
  /**
   * Poll until the current session reaches a terminal state, then resume.
   */
  private waitForStopAndResume;
  /**
   * Execute `fn`, and if the session is stopped/stopping/snapshotting, resume and retry.
   */
  private withResume;
  /**
   * Start executing a command in this sandbox.
   *
   * @param command - The command to execute.
   * @param args - Arguments to pass to the command.
   * @param opts - Optional parameters.
   * @param opts.signal - An AbortSignal to cancel the command execution.
   * @returns A {@link CommandFinished} result once execution is done.
   */
  runCommand(command: string, args?: string[], opts?: {
    signal?: AbortSignal;
  }): Promise<CommandFinished>;
  /**
   * Start executing a command in detached mode.
   *
   * @param params - The command parameters.
   * @returns A {@link Command} instance for the running command.
   */
  runCommand(params: RunCommandParams & {
    detached: true;
  }): Promise<Command>;
  /**
   * Start executing a command in this sandbox.
   *
   * @param params - The command parameters.
   * @returns A {@link CommandFinished} result once execution is done.
   */
  runCommand(params: RunCommandParams): Promise<CommandFinished>;
  /**
   * Internal helper to start a command in the sandbox.
   *
   * @param params - Command execution parameters.
   * @returns A {@link Command} or {@link CommandFinished}, depending on `detached`.
   * @internal
   */
  getCommand(cmdId: string, opts?: {
    signal?: AbortSignal;
  }): Promise<Command>;
  /**
   * Create a directory in the filesystem of this sandbox.
   *
   * @param path - Path of the directory to create
   * @param opts - Optional parameters.
   * @param opts.signal - An AbortSignal to cancel the operation.
   */
  mkDir(path: string, opts?: {
    signal?: AbortSignal;
  }): Promise<void>;
  /**
   * Read a file from the filesystem of this sandbox as a stream.
   *
   * @param file - File to read, with path and optional cwd
   * @param opts - Optional parameters.
   * @param opts.signal - An AbortSignal to cancel the operation.
   * @returns A promise that resolves to a ReadableStream containing the file contents, or null if file not found
   */
  readFile(file: {
    path: string;
    cwd?: string;
  }, opts?: {
    signal?: AbortSignal;
  }): Promise<ReadableStream | null>;
  /**
   * Read a file from the filesystem of this sandbox as a Buffer.
   *
   * @param file - File to read, with path and optional cwd
   * @param opts - Optional parameters.
   * @param opts.signal - An AbortSignal to cancel the operation.
   * @returns A promise that resolves to the file contents as a Buffer, or null if file not found
   */
  readFileToBuffer(file: {
    path: string;
    cwd?: string;
  }, opts?: {
    signal?: AbortSignal;
  }): Promise<Uint8Array | null>;
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
  downloadFile(src: {
    path: string;
    cwd?: string;
  }, dst: {
    path: string;
    cwd?: string;
  }, opts?: {
    mkdirRecursive?: boolean;
    signal?: AbortSignal;
  }): Promise<string | null>;
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
  writeFiles(files: {
    path: string;
    content: string | Uint8Array;
    mode?: number;
  }[], opts?: {
    signal?: AbortSignal;
  }): Promise<void>;
  /**
   * Get the public domain of a port of this sandbox.
   *
   * @param p - Port number to resolve
   * @returns A full domain (e.g. `https://subdomain.vercel.run`)
   * @throws If the port has no associated route
   */
  domain(p: number): string;
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
  attachDisplay(canvas: unknown, opts?: {
    fpsCap?: number;
  }): Promise<{
    stats: () => unknown;
    stop: () => void;
  }>;
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
  pkgSearch(query: string, opts?: {
    gui?: boolean;
    offset?: number;
    limit?: number;
  }): Promise<{
    packages: {
      name: string;
      version: string;
      summary: string;
    }[];
    total: number;
  }>;
  /** Repo metadata for one apk package (version, summary, depends, repo). */
  pkgInfo(name: string): Promise<{
    name: string;
    version: string;
    summary: string;
    depends: string[];
    repo: string;
  } | null>;
  /** Install an apk package (+ deps) into the guest FS, in-page. */
  pkgInstall(name: string): Promise<unknown>;
  /** Remove an installed apk package (unlink its files + drop the db entry). */
  pkgRemove(name: string): Promise<{
    name: string;
    removed: boolean;
  }>;
  /** List packages installed via the in-page apk layer. */
  pkgInstalled(): Promise<{
    name: string;
    version: string;
    fileCount: number;
  }[]>;
  persistDir(guestDir?: string): Promise<string>;
  /** Flush the IDBFS-mounted persistent dir to IndexedDB. */
  syncPersist(): Promise<void>;
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
  runConcurrent(server: {
    bytes?: Uint8Array;
    path?: string;
    argv?: string[];
    progname?: string;
  }, client: {
    bytes?: Uint8Array;
    path?: string;
    argv?: string[];
    progname?: string;
  }, opts?: {
    clientDelayMs?: number;
    overallTimeoutMs?: number;
  }): Promise<{
    timedOut: boolean;
    client: {
      exitCode: number | string;
      stdout: string;
      stderr: string;
    };
    server: {
      exitCode: number | string;
      stdout: string;
      stderr: string;
    };
  }>;
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
  startXServer(server: {
    bytes?: Uint8Array;
    path?: string;
    argv?: string[];
    progname?: string;
  }): Promise<number>;
  /**
   * Launch an X client against the running persistent X server. Resolves with
   * the client's exit when it exits; the server keeps serving.
   */
  launchXClient(client: {
    bytes?: Uint8Array;
    path?: string;
    argv?: string[];
    progname?: string;
    timeoutMs?: number;
  }): Promise<{
    timedOut: boolean;
    exitCode: number | string;
    stdout: string;
    stderr: string;
  }>;
  /** Stop the persistent X server's proxy pump. */
  stopX(): Promise<void>;
  /** Whether a persistent X server is currently running in-page. */
  xRunning(): Promise<boolean>;
  /**
   * Push a single input event into the guest input device (host -> guest).
   *
   * @param evt - `{ type: "key"|"motion"|"button", code?, button?, x?, y?, down? }`.
   * @returns `false` if the running wasm predates the input device.
   */
  pushInput(evt: {
    type: "key" | "motion" | "button";
    code?: number;
    button?: number;
    x?: number;
    y?: number;
    down?: number;
    value?: number;
  }): Promise<boolean>;
  /**
   * Current framebuffer geometry the guest published, or `null` if none yet.
   */
  displayInfo(): Promise<{
    vaddr: number;
    width: number;
    height: number;
    stride: number;
    generation: number;
  } | null>;
  /**
   * Snapshot the guest framebuffer pixels as a contiguous RGBA buffer
   * (assembled page-by-page), or `null` if no guest registered a framebuffer.
   * For driving a custom blit loop instead of {@link attachDisplay}.
   */
  displayPixels(): Promise<{
    pixels: Uint8ClampedArray;
    width: number;
    height: number;
    stride: number;
    generation: number;
  } | null>;
  /**
   * Capability flags of the running Blink build (threads, sockets, framebuffer,
   * pipe, fork, vectorISA, ...).
   */
  capabilities(): Promise<Record<string, unknown>>;
  /**
   * Stop the sandbox.
   *
   * @param opts - Optional parameters.
   * @param opts.signal - An AbortSignal to cancel the operation.
   * @returns The final session state after stopping, with optional snapshot metadata.
   */
  stop(opts?: {
    signal?: AbortSignal;
  }): Promise<SandboxSnapshot & {
    snapshot?: SnapshotMetadata;
  }>;
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
  updateNetworkPolicy(networkPolicy: NetworkPolicy, opts?: {
    signal?: AbortSignal;
  }): Promise<NetworkPolicy>;
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
  extendTimeout(duration: number, opts?: {
    signal?: AbortSignal;
  }): Promise<void>;
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
  snapshot(opts?: {
    expiration?: number;
    signal?: AbortSignal;
  }): Promise<Snapshot>;
  /**
   * Update the sandbox configuration.
   *
   * When `ports` is provided, it is treated as the full desired port list:
   * any currently exposed port omitted from the array will be deregistered.
   *
   * @param params - Fields to update.
   * @param opts - Optional abort signal.
   */
  update(params: {
    persistent?: boolean;
    resources?: {
      vcpus?: number;
    };
    timeout?: number;
    networkPolicy?: NetworkPolicy;
    tags?: Record<string, string>;
    ports?: number[];
    snapshotExpiration?: number;
    keepLastSnapshots?: {
      count: number;
      expiration?: number;
      deleteEvicted?: boolean;
    } | null;
    currentSnapshotId?: string;
  }, opts?: {
    signal?: AbortSignal;
  }): Promise<void>;
  /**
   * Delete this sandbox.
   *
   * After deletion the instance becomes inert — all further API calls will
   * throw immediately.
   */
  delete(opts?: {
    signal?: AbortSignal;
  }): Promise<void>;
  /**
   * List sessions (VMs) that have been created for this sandbox.
   *
   * @param params - Optional pagination parameters.
   * @returns The list of sessions and pagination metadata.
   */
  listSessions(params?: {
    limit?: number;
    cursor?: string;
    sortOrder?: "asc" | "desc";
    signal?: AbortSignal;
  }): Promise<{
    sessions: {
      region: string;
      vcpus: number;
      memory: number;
      runtime: string;
      timeout: number;
      status: "aborted" | "pending" | "running" | "stopping" | "stopped" | "failed" | "snapshotting";
      createdAt: number;
      updatedAt: number;
      id: string;
      requestedAt: number;
      cwd: string;
      networkPolicy?: zod0.objectOutputType<{
        mode: zod0.ZodLiteral<"allow-all">;
      }, zod0.ZodTypeAny, "passthrough"> | zod0.objectOutputType<{
        mode: zod0.ZodLiteral<"deny-all">;
      }, zod0.ZodTypeAny, "passthrough"> | zod0.objectOutputType<{
        mode: zod0.ZodLiteral<"custom">;
        allowedDomains: zod0.ZodOptional<zod0.ZodArray<zod0.ZodString, "many">>;
        allowedCIDRs: zod0.ZodOptional<zod0.ZodArray<zod0.ZodString, "many">>;
        deniedCIDRs: zod0.ZodOptional<zod0.ZodArray<zod0.ZodString, "many">>;
        injectionRules: zod0.ZodOptional<zod0.ZodArray<zod0.ZodObject<{
          domain: zod0.ZodString;
          headers: zod0.ZodOptional<zod0.ZodRecord<zod0.ZodString, zod0.ZodString>>;
          headerNames: zod0.ZodOptional<zod0.ZodArray<zod0.ZodString, "many">>;
          match: zod0.ZodOptional<zod0.ZodObject<{
            path: zod0.ZodOptional<zod0.ZodObject<{
              exact: zod0.ZodOptional<zod0.ZodString>;
              startsWith: zod0.ZodOptional<zod0.ZodString>;
              regex: zod0.ZodOptional<zod0.ZodString>;
            }, "strip", zod0.ZodTypeAny, {
              exact?: string | undefined;
              startsWith?: string | undefined;
              regex?: string | undefined;
            }, {
              exact?: string | undefined;
              startsWith?: string | undefined;
              regex?: string | undefined;
            }>>;
            method: zod0.ZodOptional<zod0.ZodArray<zod0.ZodString, "many">>;
            queryString: zod0.ZodOptional<zod0.ZodArray<zod0.ZodObject<{
              key: zod0.ZodOptional<zod0.ZodObject<{
                exact: zod0.ZodOptional<zod0.ZodString>;
                startsWith: zod0.ZodOptional<zod0.ZodString>;
                regex: zod0.ZodOptional<zod0.ZodString>;
              }, "strip", zod0.ZodTypeAny, {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              }, {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              }>>;
              value: zod0.ZodOptional<zod0.ZodObject<{
                exact: zod0.ZodOptional<zod0.ZodString>;
                startsWith: zod0.ZodOptional<zod0.ZodString>;
                regex: zod0.ZodOptional<zod0.ZodString>;
              }, "strip", zod0.ZodTypeAny, {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              }, {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              }>>;
            }, "strip", zod0.ZodTypeAny, {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }, {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }>, "many">>;
            headers: zod0.ZodOptional<zod0.ZodArray<zod0.ZodObject<{
              key: zod0.ZodOptional<zod0.ZodObject<{
                exact: zod0.ZodOptional<zod0.ZodString>;
                startsWith: zod0.ZodOptional<zod0.ZodString>;
                regex: zod0.ZodOptional<zod0.ZodString>;
              }, "strip", zod0.ZodTypeAny, {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              }, {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              }>>;
              value: zod0.ZodOptional<zod0.ZodObject<{
                exact: zod0.ZodOptional<zod0.ZodString>;
                startsWith: zod0.ZodOptional<zod0.ZodString>;
                regex: zod0.ZodOptional<zod0.ZodString>;
              }, "strip", zod0.ZodTypeAny, {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              }, {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              }>>;
            }, "strip", zod0.ZodTypeAny, {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }, {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }>, "many">>;
          }, "strip", zod0.ZodTypeAny, {
            path?: {
              exact?: string | undefined;
              startsWith?: string | undefined;
              regex?: string | undefined;
            } | undefined;
            headers?: {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }[] | undefined;
            method?: string[] | undefined;
            queryString?: {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }[] | undefined;
          }, {
            path?: {
              exact?: string | undefined;
              startsWith?: string | undefined;
              regex?: string | undefined;
            } | undefined;
            headers?: {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }[] | undefined;
            method?: string[] | undefined;
            queryString?: {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }[] | undefined;
          }>>;
        }, "strip", zod0.ZodTypeAny, {
          domain: string;
          headers?: Record<string, string> | undefined;
          headerNames?: string[] | undefined;
          match?: {
            path?: {
              exact?: string | undefined;
              startsWith?: string | undefined;
              regex?: string | undefined;
            } | undefined;
            headers?: {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }[] | undefined;
            method?: string[] | undefined;
            queryString?: {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }[] | undefined;
          } | undefined;
        }, {
          domain: string;
          headers?: Record<string, string> | undefined;
          headerNames?: string[] | undefined;
          match?: {
            path?: {
              exact?: string | undefined;
              startsWith?: string | undefined;
              regex?: string | undefined;
            } | undefined;
            headers?: {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }[] | undefined;
            method?: string[] | undefined;
            queryString?: {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }[] | undefined;
          } | undefined;
        }>, "many">>;
        forwardRules: zod0.ZodOptional<zod0.ZodArray<zod0.ZodObject<{
          domain: zod0.ZodString;
          forwardURL: zod0.ZodString;
          match: zod0.ZodOptional<zod0.ZodObject<{
            path: zod0.ZodOptional<zod0.ZodObject<{
              exact: zod0.ZodOptional<zod0.ZodString>;
              startsWith: zod0.ZodOptional<zod0.ZodString>;
              regex: zod0.ZodOptional<zod0.ZodString>;
            }, "strip", zod0.ZodTypeAny, {
              exact?: string | undefined;
              startsWith?: string | undefined;
              regex?: string | undefined;
            }, {
              exact?: string | undefined;
              startsWith?: string | undefined;
              regex?: string | undefined;
            }>>;
            method: zod0.ZodOptional<zod0.ZodArray<zod0.ZodString, "many">>;
            queryString: zod0.ZodOptional<zod0.ZodArray<zod0.ZodObject<{
              key: zod0.ZodOptional<zod0.ZodObject<{
                exact: zod0.ZodOptional<zod0.ZodString>;
                startsWith: zod0.ZodOptional<zod0.ZodString>;
                regex: zod0.ZodOptional<zod0.ZodString>;
              }, "strip", zod0.ZodTypeAny, {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              }, {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              }>>;
              value: zod0.ZodOptional<zod0.ZodObject<{
                exact: zod0.ZodOptional<zod0.ZodString>;
                startsWith: zod0.ZodOptional<zod0.ZodString>;
                regex: zod0.ZodOptional<zod0.ZodString>;
              }, "strip", zod0.ZodTypeAny, {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              }, {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              }>>;
            }, "strip", zod0.ZodTypeAny, {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }, {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }>, "many">>;
            headers: zod0.ZodOptional<zod0.ZodArray<zod0.ZodObject<{
              key: zod0.ZodOptional<zod0.ZodObject<{
                exact: zod0.ZodOptional<zod0.ZodString>;
                startsWith: zod0.ZodOptional<zod0.ZodString>;
                regex: zod0.ZodOptional<zod0.ZodString>;
              }, "strip", zod0.ZodTypeAny, {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              }, {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              }>>;
              value: zod0.ZodOptional<zod0.ZodObject<{
                exact: zod0.ZodOptional<zod0.ZodString>;
                startsWith: zod0.ZodOptional<zod0.ZodString>;
                regex: zod0.ZodOptional<zod0.ZodString>;
              }, "strip", zod0.ZodTypeAny, {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              }, {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              }>>;
            }, "strip", zod0.ZodTypeAny, {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }, {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }>, "many">>;
          }, "strip", zod0.ZodTypeAny, {
            path?: {
              exact?: string | undefined;
              startsWith?: string | undefined;
              regex?: string | undefined;
            } | undefined;
            headers?: {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }[] | undefined;
            method?: string[] | undefined;
            queryString?: {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }[] | undefined;
          }, {
            path?: {
              exact?: string | undefined;
              startsWith?: string | undefined;
              regex?: string | undefined;
            } | undefined;
            headers?: {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }[] | undefined;
            method?: string[] | undefined;
            queryString?: {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }[] | undefined;
          }>>;
        }, "strip", zod0.ZodTypeAny, {
          domain: string;
          forwardURL: string;
          match?: {
            path?: {
              exact?: string | undefined;
              startsWith?: string | undefined;
              regex?: string | undefined;
            } | undefined;
            headers?: {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }[] | undefined;
            method?: string[] | undefined;
            queryString?: {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }[] | undefined;
          } | undefined;
        }, {
          domain: string;
          forwardURL: string;
          match?: {
            path?: {
              exact?: string | undefined;
              startsWith?: string | undefined;
              regex?: string | undefined;
            } | undefined;
            headers?: {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }[] | undefined;
            method?: string[] | undefined;
            queryString?: {
              value?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
              key?: {
                exact?: string | undefined;
                startsWith?: string | undefined;
                regex?: string | undefined;
              } | undefined;
            }[] | undefined;
          } | undefined;
        }>, "many">>;
      }, zod0.ZodTypeAny, "passthrough"> | undefined;
      startedAt?: number | undefined;
      requestedStopAt?: number | undefined;
      stoppedAt?: number | undefined;
      abortedAt?: number | undefined;
      duration?: number | undefined;
      sourceSnapshotId?: string | undefined;
      snapshottedAt?: number | undefined;
      interactivePort?: number | undefined;
      activeCpuDurationMs?: number | undefined;
      networkTransfer?: {
        ingress: number;
        egress: number;
      } | undefined;
    }[];
    pagination: {
      count: number;
      next: null;
    };
  }>;
  /**
   * List snapshots that belong to this sandbox.
   *
   * @param params - Optional pagination parameters.
   * @returns The list of snapshots and pagination metadata.
   */
  listSnapshots(params?: {
    limit?: number;
    cursor?: string;
    sortOrder?: "asc" | "desc";
    signal?: AbortSignal;
  }): Promise<{
    snapshots: {
      region: string;
      status: "failed" | "created" | "deleted";
      createdAt: number;
      updatedAt: number;
      id: string;
      sourceSessionId: string;
      sizeBytes: number;
      expiresAt?: number | undefined;
      lastUsedAt?: number | undefined;
      creationMethod?: string | undefined;
      parentId?: string | undefined;
    }[];
    pagination: {
      count: number;
      next: null;
    };
  }>;
}
//#endregion
export { Sandbox, SerializedSandbox };
//# sourceMappingURL=sandbox.d.cts.map