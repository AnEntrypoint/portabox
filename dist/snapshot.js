import { NotSupportedError } from "./api-client/webix-client.js";
import "./api-client/index.js";

//#region src/snapshot.ts
/**
* A Snapshot is a saved state of a Sandbox that can be used to create new Sandboxes
*
* Use {@link Sandbox.snapshot} or {@link Snapshot.get} to construct.
* @hideconstructor
*/
var Snapshot = class {
	/**
	* Return the in-browser sandbox client bound at construction.
	* @internal
	*/
	async ensureClient() {
		if (this._client) return this._client;
		throw new Error("Snapshot is not attached to a live in-browser sandbox host.");
	}
	/**
	* Unique ID of this snapshot.
	*/
	get snapshotId() {
		return this.snapshot.id;
	}
	/**
	* The ID of the session from which this snapshot was created.
	*/
	get sourceSessionId() {
		return this.snapshot.sourceSessionId;
	}
	/**
	* The status of the snapshot.
	*/
	get status() {
		return this.snapshot.status;
	}
	/**
	* The size of the snapshot in bytes, or null if not available.
	*/
	get sizeBytes() {
		return this.snapshot.sizeBytes;
	}
	/**
	* The creation date of this snapshot.
	*/
	get createdAt() {
		return new Date(this.snapshot.createdAt);
	}
	/**
	* When this snapshot was last updated.
	*/
	get updatedAt() {
		return new Date(this.snapshot.updatedAt);
	}
	/**
	* The expiration date of this snapshot, or undefined if it does not expire.
	*/
	get expiresAt() {
		if (this.snapshot.expiresAt === void 0) return;
		return new Date(this.snapshot.expiresAt);
	}
	constructor({ client, snapshot }) {
		this._client = null;
		this._client = client ?? null;
		this.snapshot = snapshot;
	}
	/**
	* Allow to get a list of snapshots for a team narrowed to the given params.
	* It returns both the snapshots and the pagination metadata to allow getting
	* the next page of results.
	*
	* The returned object is async-iterable to auto-paginate through all pages:
	*
	* ```ts
	* const result = await Snapshot.list({ name: "my-sandbox" });
	* for await (const snapshot of result) { ... }
	* // or: await result.toArray();
	* // or: for await (const page of result.pages()) { ... }
	* ```
	*/
	static async list() {
		throw new NotSupportedError("Snapshot.list is unavailable in the self-contained sandbox: snapshots are held by a live in-browser host, not a remote account. Use sandbox.snapshot() and keep the returned Snapshot.");
	}
	/**
	* Fetch the snapshot ancestry tree anchored on a given snapshot.
	* It returns both the tree nodes and the pagination metadata to allow
	* walking the next page of results in the same direction.
	*
	* The returned object is async-iterable to auto-paginate through all pages
	* in the direction set by `sortOrder` (`"desc"` walks ancestors, `"asc"`
	* walks descendants):
	*
	* ```ts
	* const result = await Snapshot.tree({ snapshotId: "snap_abc", sortOrder: "desc" });
	* for await (const node of result) { ... }
	* // or: await result.toArray();
	* // or: for await (const page of result.pages()) { ... }
	* ```
	*/
	static async tree() {
		throw new NotSupportedError("Snapshot.tree is unavailable in the self-contained sandbox.");
	}
	/**
	* Retrieve an existing snapshot. Unavailable in the self-contained sandbox —
	* snapshots are held in memory by the live host, not addressable by ID across
	* processes. Use the {@link Snapshot} returned by `sandbox.snapshot()`.
	*/
	static async get() {
		throw new NotSupportedError("Snapshot.get is unavailable in the self-contained sandbox: keep the Snapshot returned by sandbox.snapshot().");
	}
	/**
	* Delete this snapshot.
	*
	* @param opts - Optional parameters.
	* @param opts.signal - An AbortSignal to cancel the operation.
	* @returns A promise that resolves once the snapshot has been deleted.
	*/
	async delete(opts) {
		this.snapshot = (await (await this.ensureClient()).deleteSnapshot({
			snapshotId: this.snapshot.id,
			signal: opts?.signal
		})).json.snapshot;
	}
};

//#endregion
export { Snapshot };
//# sourceMappingURL=snapshot.js.map