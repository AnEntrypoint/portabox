# portabox

Run a real x86_64 Linux userspace **entirely in the browser (or Node)** — no
server, no remote network, no credentials. Commands execute as real x86_64 ELF binaries
inside a WASM module via [webix](https://github.com/AnEntrypoint/webix), a
Blink-backed emulator that owns the CPU, MMU, ~150 Linux syscalls, and an
in-memory filesystem.

The API mirrors the `Sandbox` surface familiar from `@vercel/sandbox` (which
this is derived from — see `NOTICE.md`), but the backend is fully self-contained.

**[▶ Live demo](https://anentrypoint.github.io/portabox/)** — boots a Linux
microVM in your browser tab and runs commands live.

![demo](browser-demo/demo-screenshot.png)

## Install

```sh
npm install portabox
```

## Quick start

```ts
import { Sandbox } from "portabox";

const sandbox = await Sandbox.create();

const echo = await sandbox.runCommand("echo", ["hello", "sandbox"]);
console.log(await echo.stdout()); // "hello sandbox"

await sandbox.writeFiles([{ path: "/tmp/note.txt", content: "hi\n" }]);
const note = await sandbox.readFileToBuffer({ path: "/tmp/note.txt" });
console.log(new TextDecoder().decode(note!)); // "hi"
```

Commands run as real x86_64 ELF binaries. The default rootfs is Alpine, so the
full BusyBox applet set (`sh`, `ls`, `cat`, `echo`, `uname`, `expr`, …) is
available out of the box; install more with `apk`. Filesystem writes, snapshots,
and command state persist for the lifetime of the sandbox (one in-browser VM).

## Assets

The Blink WASM and the rootfs tarball are fetched at boot and cached (Cache API
in the browser). Point at your own copies or supply bytes directly:

```ts
await Sandbox.create({
  wasmUrl: "/assets/blinkenlib.wasm",      // default: /containers/blinkenlib.wasm
  glueUrl: "/assets/blinkenlib.js",        // default: /containers/blinkenlib.js
  rootfsUrl: "/assets/alpine-rootfs.tar.gz", // gzip auto-detected
  // or, instead of rootfsUrl:
  // rootfsTarBytes: myUint8Array,
});
```

In the browser, serve `blinkenlib.wasm` with `Content-Type: application/wasm`.
In Node, pass `wasmPath` / `gluePath` filesystem paths.

## Snapshots

`sandbox.snapshot()` captures byte-exact WASM memory + registers. Keep the
returned `Snapshot`; restore is handled by the live host.

## Display + input

The Blink build exposes an in-guest framebuffer + input device, so a sandbox
can drive an HTML canvas with no remote display:

- `await sandbox.attachDisplay(canvas, { fpsCap })` — start a
  requestAnimationFrame loop that blits the guest's RGBA framebuffer zero-copy
  to the canvas and forwards canvas keyboard/mouse events into the guest input
  device. Returns `{ stats(), stop() }`.
- `await sandbox.pushInput({ type: "key"|"motion"|"button", code?, button?, x?, y?, down? })`
  — push a single input event (host -> guest).
- `await sandbox.displayInfo()` — framebuffer geometry, or `null` until a guest
  registers one.
- `await sandbox.capabilities()` — runtime flags
  (`{ threads, sockets, framebuffer, pipe, pipelines, fork, vectorISA, ... }`).

A guest program registers its framebuffer via a synthetic syscall; any fbdev
program (or a framebuffer X server) drives the canvas this way.

## What is not available

There is no remote account registry and no remote/public network, so the
following throw `NotSupportedError`:

- **Public network / port exposure**: `sandbox.domain(port)`, exposed `ports`,
  dev servers reachable from outside the page, `updateNetworkPolicy`. (The
  guest's own `socket()` is implemented — sockets are enabled — but there is no
  tunnel to the public internet from the in-page sandbox.)
- **Remote registry**: `Sandbox.get`, `Sandbox.getOrCreate`, `Sandbox.fork`,
  `Sandbox.list`, `Snapshot.get` / `Snapshot.list` / `Snapshot.tree`. A
  sandbox exists only within the page/process that created it.
- **Sources**: `create({ source: { type: "git" | "tarball" | "snapshot" } })`.
  Seed files with `writeFiles()` instead.

Build-flag characteristics inherited from Blink: the build is **threaded**
(`-pthread`, SharedArrayBuffer — needs cross-origin isolation / COOP+COEP at
serve time) and **sockets-enabled**. `fork()` is unavailable (emscripten has no
real process creation), so shell pipelines (`sh -c 'a | b'`) do not run. AVX/
AVX-512 raise `SIGILL` (SSE2 only). There is no JIT (impossible under wasm32).

## Browser support

`CompressionStream`/`DecompressionStream` are used to inflate a gzipped rootfs:
Chrome 80+, Firefox 113+, Safari 16.4+.

## Run the demo locally

```sh
npm install
npm run build
npm run build:demo
node browser-demo/serve.mjs   # http://localhost:8127
```

## License

Apache-2.0 — derived from `@vercel/sandbox` (Apache-2.0), with the remote
backend replaced by the in-browser webix/Blink emulator. See `LICENSE` and
`NOTICE.md`. webix is MIT; Blink (`blinkenlib.wasm`) is ISC.
