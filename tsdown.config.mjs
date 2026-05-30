import { defineConfig } from "tsdown";

// Plain .mjs (not .ts): when portabox is installed as a git dependency, its
// `prepare` build runs under node_modules where Node cannot strip types from a
// .ts config (ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING). A JS config loads
// everywhere.
export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  outExtensions: ({ format }) => ({
    js: format === "cjs" ? ".cjs" : ".js",
  }),
  sourcemap: true,
  dts: true,
  target: "es2020",
  // webix is loaded at runtime (its wasm/glue are fetched), so keep it external.
  external: [/^webix(\/.*)?$/],
  bundle: false,
});
