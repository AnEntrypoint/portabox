//#region src/utils/browser-primitives.ts
/**
* Browser-safe replacements for the handful of Node primitives the SDK reaches
* for: base64url decoding, byte-length measurement, posix path normalization,
* and a promise-based sleep. All implementations are native (atob/TextEncoder/
* TextDecoder/string ops) so the browser bundle ships zero polyfill weight.
*
* These mirror, exactly, the observable behavior of the Node equivalents they
* replace (Buffer.from(..,"base64url"), Buffer.byteLength, path.posix.*,
* timers/promises.setTimeout) so the same call sites work under either entry.
*/
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder("utf-8");
/**
* Sleep for `ms`, rejecting early if the signal aborts. Isomorphic replacement
* for `node:timers/promises` setTimeout(ms, value, { signal }).
*/
function sleepWithSignal(ms, signal) {
	return new Promise((resolve, reject) => {
		if (signal?.aborted) {
			reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
			return;
		}
		const timer = globalThis.setTimeout(() => {
			signal?.removeEventListener("abort", onAbort);
			resolve();
		}, ms);
		const onAbort = () => {
			globalThis.clearTimeout(timer);
			reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
		};
		signal?.addEventListener("abort", onAbort, { once: true });
	});
}
/**
* Inlined POSIX path operations — only the four the SDK uses (isAbsolute,
* normalize, join, relative). Pure string algorithms, no runtime dependency.
*/
function normalizeArray(parts, allowAboveRoot) {
	const result = [];
	for (const part of parts) {
		if (part === "" || part === ".") continue;
		if (part === "..") {
			if (result.length && result[result.length - 1] !== "..") result.pop();
			else if (allowAboveRoot) result.push("..");
		} else result.push(part);
	}
	return result;
}
const posix = {
	isAbsolute(p) {
		return p.length > 0 && p[0] === "/";
	},
	normalize(p) {
		const isAbs = posix.isAbsolute(p);
		const trailingSlash = p.length > 1 && p[p.length - 1] === "/";
		let normalized = normalizeArray(p.split("/"), !isAbs).join("/");
		if (!normalized && !isAbs) normalized = ".";
		if (normalized && trailingSlash) normalized += "/";
		return (isAbs ? "/" : "") + normalized;
	},
	join(...segments) {
		const joined = segments.filter((s) => s.length > 0).join("/");
		return joined === "" ? "." : posix.normalize(joined);
	},
	relative(from, to) {
		from = posix.normalize(from);
		to = posix.normalize(to);
		if (from === to) return "";
		const fromParts = from.split("/").filter(Boolean);
		const toParts = to.split("/").filter(Boolean);
		let i = 0;
		const min = Math.min(fromParts.length, toParts.length);
		while (i < min && fromParts[i] === toParts[i]) i++;
		return [...fromParts.slice(i).map(() => ".."), ...toParts.slice(i)].join("/");
	}
};

//#endregion
export { posix, sleepWithSignal };
//# sourceMappingURL=browser-primitives.js.map