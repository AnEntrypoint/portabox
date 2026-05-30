
//#region src/utils/consume-readable.ts
/**
* Consume a stream entirely, concatenating its content into a single
* Uint8Array. Accepts either a Node Readable (data/end events) or a WHATWG
* ReadableStream, so the same helper works under both the Node and browser
* builds.
*/
async function consumeReadable(readable) {
	if (typeof readable.getReader === "function") {
		const reader = readable.getReader();
		const chunks = [];
		let total = 0;
		for (;;) {
			const { value, done } = await reader.read();
			if (done) break;
			if (value) {
				chunks.push(value);
				total += value.byteLength;
			}
		}
		const out = new Uint8Array(total);
		let offset = 0;
		for (const chunk of chunks) {
			out.set(chunk, offset);
			offset += chunk.byteLength;
		}
		return out;
	}
	return new Promise((resolve, reject) => {
		const chunks = [];
		const node = readable;
		node.on("error", (err) => reject(err));
		node.on("data", (chunk) => chunks.push(chunk));
		node.on("end", () => {
			let total = 0;
			for (const c of chunks) total += c.byteLength;
			const out = new Uint8Array(total);
			let offset = 0;
			for (const c of chunks) {
				out.set(c, offset);
				offset += c.byteLength;
			}
			resolve(out);
		});
	});
}

//#endregion
exports.consumeReadable = consumeReadable;
//# sourceMappingURL=consume-readable.cjs.map