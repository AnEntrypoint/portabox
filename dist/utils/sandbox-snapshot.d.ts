import { SessionMetaData } from "../api-client/validators.js";
import "../api-client/index.js";
import { NetworkPolicy } from "../network-policy.js";

//#region src/utils/sandbox-snapshot.d.ts
type SandboxSnapshot = Omit<SessionMetaData, "networkPolicy"> & {
  networkPolicy?: NetworkPolicy;
};
//#endregion
export { SandboxSnapshot };
//# sourceMappingURL=sandbox-snapshot.d.ts.map