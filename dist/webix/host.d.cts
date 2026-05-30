import "webix/blink-core";

//#region src/webix/host.d.ts

/**
 * WebixHost — lifecycle wrapper around a single webix Blink x86_64 Linux host.
 *
 * One WebixHost backs one Sandbox: the Blink WASM owns the CPU/MMU/syscalls and
 * an in-memory Linux filesystem (MEMFS), so all of a sandbox's commands and file
 * operations share persistent state through the lifetime of the host. There is
 * no remote network — this is a self-contained, in-browser microVM, so
 * remote ports/dev-servers/public domains are unavailable by construction.
 * The portabox build additionally exposes a framebuffer + input device (see
 * fbView/attachDisplay/pushInput) and is threaded + sockets-enabled (socket()
 * works in-process); fork() remains absent (emscripten limitation).
 */
/** Boot progress stages emitted by {@link WebixHost.boot}, in order. */
type BootStage = "runtime" | "rootfs" | "mount" | "ready";
interface WebixHostOptions {
  /** Called as boot advances through its stages, for a legible cold-boot UI. */
  onProgress?: (stage: BootStage) => void;
  /** URL of the Blink wasm. Defaults to `/containers/blinkenlib.wasm`. */
  wasmUrl?: string;
  /** URL of the Blink emscripten glue JS. Defaults to `/containers/blinkenlib.js`. */
  glueUrl?: string;
  /**
   * URL of the root filesystem tarball (optionally gzipped) mounted at `/`.
   * Defaults to `/containers/alpine-minirootfs-x86_64.tar.gz`.
   */
  rootfsUrl?: string;
  /** Raw rootfs tar bytes (skips the fetch); takes precedence over rootfsUrl. */
  rootfsTarBytes?: Uint8Array;
  /** Node-only: filesystem path to the wasm (skips fetch). */
  wasmPath?: string;
  /** Node-only: filesystem path to the glue JS. */
  gluePath?: string;
}
//#endregion
export { WebixHostOptions };
//# sourceMappingURL=host.d.cts.map