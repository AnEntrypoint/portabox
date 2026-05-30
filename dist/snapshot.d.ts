import { SnapshotMetadata } from "./api-client/validators.js";
import { WebixApiClient } from "./api-client/webix-client.js";
import "./api-client/index.js";

//#region src/snapshot.d.ts
interface SerializedSnapshot {
  snapshot: SnapshotMetadata;
}
/**
 * A Snapshot is a saved state of a Sandbox that can be used to create new Sandboxes
 *
 * Use {@link Sandbox.snapshot} or {@link Snapshot.get} to construct.
 * @hideconstructor
 */
declare class Snapshot {
  private _client;
  /**
   * Return the in-browser sandbox client bound at construction.
   * @internal
   */
  private ensureClient;
  /**
   * Unique ID of this snapshot.
   */
  get snapshotId(): string;
  /**
   * The ID of the session from which this snapshot was created.
   */
  get sourceSessionId(): string;
  /**
   * The status of the snapshot.
   */
  get status(): SnapshotMetadata["status"];
  /**
   * The size of the snapshot in bytes, or null if not available.
   */
  get sizeBytes(): number;
  /**
   * The creation date of this snapshot.
   */
  get createdAt(): Date;
  /**
   * When this snapshot was last updated.
   */
  get updatedAt(): Date;
  /**
   * The expiration date of this snapshot, or undefined if it does not expire.
   */
  get expiresAt(): Date | undefined;
  /**
   * Internal metadata about this snapshot.
   */
  private snapshot;
  constructor({
    client,
    snapshot
  }: {
    client?: WebixApiClient;
    snapshot: SnapshotMetadata;
  });
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
  static list(): Promise<never>;
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
  static tree(): Promise<never>;
  /**
   * Retrieve an existing snapshot. Unavailable in the self-contained sandbox —
   * snapshots are held in memory by the live host, not addressable by ID across
   * processes. Use the {@link Snapshot} returned by `sandbox.snapshot()`.
   */
  static get(): Promise<never>;
  /**
   * Delete this snapshot.
   *
   * @param opts - Optional parameters.
   * @param opts.signal - An AbortSignal to cancel the operation.
   * @returns A promise that resolves once the snapshot has been deleted.
   */
  delete(opts?: {
    signal?: AbortSignal;
  }): Promise<void>;
}
//#endregion
export { SerializedSnapshot, Snapshot };
//# sourceMappingURL=snapshot.d.ts.map