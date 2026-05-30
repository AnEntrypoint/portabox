import { WebixHostOptions } from "../webix/host.js";
import { CommandData, CommandFinishedData, SandboxRouteData, SessionMetaData, SnapshotMetadata } from "./validators.js";
import * as zod0 from "zod";

//#region src/api-client/webix-client.d.ts

declare class NotSupportedError extends Error {
  name: string;
}
declare class WebixApiClient {
  private host;
  private booted;
  private sessionId;
  private sandboxName;
  private runtime;
  private cwd;
  private status;
  private commands;
  private snapshots;
  private createdAt;
  constructor(opts?: WebixHostOptions & {
    name?: string;
    runtime?: string;
  });
  private ensureBooted;
  private sessionMeta;
  private sandboxMeta;
  createSandbox(params: {
    name?: string;
    runtime?: string;
    cwd?: string;
  }): Promise<{
    json: {
      sandbox: {
        name: string;
        persistent: boolean;
        status: "aborted" | "pending" | "running" | "stopping" | "stopped" | "failed" | "snapshotting";
        createdAt: number;
        updatedAt: number;
        currentSessionId: string;
        region?: string | undefined;
        vcpus?: number | undefined;
        memory?: number | undefined;
        runtime?: string | undefined;
        timeout?: number | undefined;
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
        totalEgressBytes?: number | undefined;
        totalIngressBytes?: number | undefined;
        totalActiveCpuDurationMs?: number | undefined;
        totalDurationMs?: number | undefined;
        currentSnapshotId?: string | undefined;
        cwd?: string | undefined;
        statusUpdatedAt?: number | undefined;
        tags?: Record<string, string> | undefined;
        snapshotExpiration?: number | undefined;
        keepLastSnapshots?: {
          count: number;
          expiration?: number | undefined;
          deleteEvicted?: boolean | undefined;
        } | undefined;
      };
      session: {
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
      };
      routes: SandboxRouteData[];
    };
    response: Response;
    text: string;
  }>;
  getSandbox(): Promise<{
    json: {
      sandbox: {
        name: string;
        persistent: boolean;
        status: "aborted" | "pending" | "running" | "stopping" | "stopped" | "failed" | "snapshotting";
        createdAt: number;
        updatedAt: number;
        currentSessionId: string;
        region?: string | undefined;
        vcpus?: number | undefined;
        memory?: number | undefined;
        runtime?: string | undefined;
        timeout?: number | undefined;
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
        totalEgressBytes?: number | undefined;
        totalIngressBytes?: number | undefined;
        totalActiveCpuDurationMs?: number | undefined;
        totalDurationMs?: number | undefined;
        currentSnapshotId?: string | undefined;
        cwd?: string | undefined;
        statusUpdatedAt?: number | undefined;
        tags?: Record<string, string> | undefined;
        snapshotExpiration?: number | undefined;
        keepLastSnapshots?: {
          count: number;
          expiration?: number | undefined;
          deleteEvicted?: boolean | undefined;
        } | undefined;
      };
      session: {
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
      };
      routes: SandboxRouteData[];
    };
    response: Response;
    text: string;
  }>;
  getSession(_params?: {
    sessionId?: string;
    signal?: AbortSignal;
  }): Promise<{
    json: {
      session: {
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
      };
      routes: SandboxRouteData[];
    };
    response: Response;
    text: string;
  }>;
  stopSession(_params?: {
    sessionId?: string;
    signal?: AbortSignal;
  }): Promise<{
    json: {
      session: {
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
      };
      sandbox: {
        name: string;
        persistent: boolean;
        status: "aborted" | "pending" | "running" | "stopping" | "stopped" | "failed" | "snapshotting";
        createdAt: number;
        updatedAt: number;
        currentSessionId: string;
        region?: string | undefined;
        vcpus?: number | undefined;
        memory?: number | undefined;
        runtime?: string | undefined;
        timeout?: number | undefined;
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
        totalEgressBytes?: number | undefined;
        totalIngressBytes?: number | undefined;
        totalActiveCpuDurationMs?: number | undefined;
        totalDurationMs?: number | undefined;
        currentSnapshotId?: string | undefined;
        cwd?: string | undefined;
        statusUpdatedAt?: number | undefined;
        tags?: Record<string, string> | undefined;
        snapshotExpiration?: number | undefined;
        keepLastSnapshots?: {
          count: number;
          expiration?: number | undefined;
          deleteEvicted?: boolean | undefined;
        } | undefined;
      };
      snapshot: SnapshotMetadata | undefined;
    };
    response: Response;
    text: string;
  }>;
  extendTimeout(_params?: {
    sessionId?: string;
    duration?: number;
    signal?: AbortSignal;
  }): Promise<{
    json: {
      session: {
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
      };
    };
    response: Response;
    text: string;
  }>;
  /** Resolve and run a command, returning its full result. */
  private exec;
  runCommand(params: {
    sessionId: string;
    cwd?: string;
    command: string;
    args: string[];
    env: Record<string, string>;
    sudo: boolean;
    wait: true;
    signal?: AbortSignal;
  }): Promise<{
    command: CommandData;
    finished: Promise<CommandFinishedData>;
  }>;
  runCommand(params: {
    sessionId: string;
    cwd?: string;
    command: string;
    args: string[];
    env: Record<string, string>;
    sudo: boolean;
    wait?: false;
    signal?: AbortSignal;
  }): Promise<{
    json: {
      command: CommandData;
    };
  }>;
  getCommand(params: {
    sessionId?: string;
    cmdId: string;
    wait?: boolean;
    signal?: AbortSignal;
  }): Promise<{
    json: {
      command: {
        name: string;
        id: string;
        startedAt: number;
        cwd: string;
        args: string[];
        sessionId: string;
        exitCode: number | null;
      };
    };
    response: Response;
    text: string;
  }>;
  killCommand(params: {
    sessionId?: string;
    commandId: string;
    signal?: number;
    abortSignal?: AbortSignal;
  }): Promise<{
    json: {
      command: {
        name: string;
        id: string;
        startedAt: number;
        cwd: string;
        args: string[];
        sessionId: string;
        exitCode: number | null;
      } | null;
    };
    response: Response;
    text: string;
  }>;
  getLogs(params: {
    sessionId?: string;
    cmdId: string;
    signal?: AbortSignal;
  }): AsyncGenerator<{
    stream: "stdout" | "stderr";
    data: string;
  }, void, void> & Disposable & {
    close(): void;
  };
  mkDir(params: {
    sessionId?: string;
    path: string;
    cwd?: string;
    signal?: AbortSignal;
  }): Promise<{
    json: {};
    response: Response;
    text: string;
  }>;
  private mkdirp;
  getFileWriter(params: {
    sessionId?: string;
    extractDir: string;
    signal?: AbortSignal;
  }): {
    writer: {
      addFile(file: {
        name: string;
        content: string | Uint8Array;
        mode?: number;
      }): Promise<void>;
      end(): void;
    };
    response: Promise<{
      json: {};
      response: Response;
      text: string;
    }>;
  };
  writeFiles(params: {
    sessionId?: string;
    cwd: string;
    files: {
      path: string;
      content: string | Uint8Array;
      mode?: number;
    }[];
    extractDir: string;
    signal?: AbortSignal;
  }): Promise<{
    json: {};
    response: Response;
    text: string;
  }>;
  readFile(params: {
    sessionId?: string;
    path: string;
    cwd?: string;
    signal?: AbortSignal;
  }): Promise<ReadableStream | null>;
  createSnapshot(_params?: {
    sessionId?: string;
    expiration?: number;
    signal?: AbortSignal;
  }): Promise<{
    json: {
      snapshot: {
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
      };
      session: {
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
      };
    };
    response: Response;
    text: string;
  }>;
  getSnapshot(params: {
    snapshotId: string;
    signal?: AbortSignal;
  }): Promise<{
    json: {
      snapshot: {
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
      };
    };
    response: Response;
    text: string;
  }>;
  deleteSnapshot(params: {
    snapshotId: string;
    signal?: AbortSignal;
  }): Promise<{
    json: {
      snapshot: {
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
      };
    };
    response: Response;
    text: string;
  }>;
  listSnapshots(): Promise<{
    json: {
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
    };
    response: Response;
    text: string;
  }>;
  getSnapshotTree(): Promise<{
    json: {
      snapshots: never[];
      pagination: {
        count: number;
        next: null;
      };
    };
    response: Response;
    text: string;
  }>;
  /** Restore a previously captured snapshot into the live host. */
  restoreSnapshot(snapshotId: string): Promise<void>;
  /**
   * Run an X server (Xvfb) and an X client concurrently in-page (each on its
   * own worker pthread), talking over blink's in-process AF_UNIX layer.
   * Resolves when the client exits; the server stays RUNNING. Bytes are read
   * from the guest FS paths if not supplied.
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
   * Start a PERSISTENT X server (Xvfb) in-page that keeps serving across
   * multiple client launches (unlike one-shot runConcurrent). Returns once the
   * server VM is spawned + its proxy pump is running; the framebuffer updates
   * continuously so the host can blit it on rAF. Bytes read from the guest FS
   * path if not supplied.
   */
  startXServer(server: {
    bytes?: Uint8Array;
    path?: string;
    argv?: string[];
    progname?: string;
  }): Promise<number>;
  /**
   * Launch an X client against the running persistent X server. Resolves with
   * the client's exit; the server keeps serving.
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
  /** Attach a canvas to the guest framebuffer (rAF blit + input forwarding). */
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
  pkgInfo(name: string): Promise<{
    name: string;
    version: string;
    summary: string;
    depends: string[];
    repo: string;
  } | null>;
  pkgInstall(name: string): Promise<unknown>;
  pkgRemove(name: string): Promise<{
    name: string;
    removed: boolean;
  }>;
  pkgInstalled(): Promise<{
    name: string;
    version: string;
    fileCount: number;
  }[]>;
  persistDir(guestDir?: string): Promise<string>;
  syncPersist(): Promise<void>;
  attachDisplay(canvas: unknown, opts?: {
    fpsCap?: number;
  }): Promise<{
    stats: () => unknown;
    stop: () => void;
  }>;
  /** Push one input event (key/mouse) into the guest input device. */
  pushInput(evt: {
    type: "key" | "motion" | "button";
    code?: number;
    button?: number;
    x?: number;
    y?: number;
    down?: number;
    value?: number;
  }): Promise<boolean>;
  /** Current framebuffer geometry, or null if no guest registered one. */
  displayInfo(): Promise<{
    vaddr: number;
    width: number;
    height: number;
    stride: number;
    generation: number;
  } | null>;
  /**
   * Snapshot the guest framebuffer pixels as a contiguous RGBA Uint8ClampedArray
   * (assembled page-by-page by the host), or null if no guest registered a
   * framebuffer. For callers that drive their own blit loop (e.g. a render-once
   * GUI app) instead of attachDisplay.
   */
  displayPixels(): Promise<{
    pixels: Uint8ClampedArray;
    width: number;
    height: number;
    stride: number;
    generation: number;
  } | null>;
  /** Capability flags of the running Blink build. */
  capabilities(): Promise<Record<string, unknown>>;
  listSessions(): Promise<{
    json: {
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
    };
    response: Response;
    text: string;
  }>;
  listSandboxes(): Promise<{
    json: {
      sandboxes: {
        name: string;
        persistent: boolean;
        status: "aborted" | "pending" | "running" | "stopping" | "stopped" | "failed" | "snapshotting";
        createdAt: number;
        updatedAt: number;
        currentSessionId: string;
        region?: string | undefined;
        vcpus?: number | undefined;
        memory?: number | undefined;
        runtime?: string | undefined;
        timeout?: number | undefined;
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
        totalEgressBytes?: number | undefined;
        totalIngressBytes?: number | undefined;
        totalActiveCpuDurationMs?: number | undefined;
        totalDurationMs?: number | undefined;
        currentSnapshotId?: string | undefined;
        cwd?: string | undefined;
        statusUpdatedAt?: number | undefined;
        tags?: Record<string, string> | undefined;
        snapshotExpiration?: number | undefined;
        keepLastSnapshots?: {
          count: number;
          expiration?: number | undefined;
          deleteEvicted?: boolean | undefined;
        } | undefined;
      }[];
      pagination: {
        count: number;
        next: null;
      };
    };
    response: Response;
    text: string;
  }>;
  updateSandbox(params: {
    runtime?: string;
    cwd?: string;
  }): Promise<{
    json: {
      sandbox: {
        name: string;
        persistent: boolean;
        status: "aborted" | "pending" | "running" | "stopping" | "stopped" | "failed" | "snapshotting";
        createdAt: number;
        updatedAt: number;
        currentSessionId: string;
        region?: string | undefined;
        vcpus?: number | undefined;
        memory?: number | undefined;
        runtime?: string | undefined;
        timeout?: number | undefined;
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
        totalEgressBytes?: number | undefined;
        totalIngressBytes?: number | undefined;
        totalActiveCpuDurationMs?: number | undefined;
        totalDurationMs?: number | undefined;
        currentSnapshotId?: string | undefined;
        cwd?: string | undefined;
        statusUpdatedAt?: number | undefined;
        tags?: Record<string, string> | undefined;
        snapshotExpiration?: number | undefined;
        keepLastSnapshots?: {
          count: number;
          expiration?: number | undefined;
          deleteEvicted?: boolean | undefined;
        } | undefined;
      };
      routes: SandboxRouteData[];
    };
    response: Response;
    text: string;
  }>;
  deleteSandbox(): Promise<{
    json: {
      sandbox: {
        name: string;
        persistent: boolean;
        status: "aborted" | "pending" | "running" | "stopping" | "stopped" | "failed" | "snapshotting";
        createdAt: number;
        updatedAt: number;
        currentSessionId: string;
        region?: string | undefined;
        vcpus?: number | undefined;
        memory?: number | undefined;
        runtime?: string | undefined;
        timeout?: number | undefined;
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
        totalEgressBytes?: number | undefined;
        totalIngressBytes?: number | undefined;
        totalActiveCpuDurationMs?: number | undefined;
        totalDurationMs?: number | undefined;
        currentSnapshotId?: string | undefined;
        cwd?: string | undefined;
        statusUpdatedAt?: number | undefined;
        tags?: Record<string, string> | undefined;
        snapshotExpiration?: number | undefined;
        keepLastSnapshots?: {
          count: number;
          expiration?: number | undefined;
          deleteEvicted?: boolean | undefined;
        } | undefined;
      };
      routes: SandboxRouteData[];
    };
    response: Response;
    text: string;
  }>;
  updateNetworkPolicy(_params?: {
    sessionId?: string;
    networkPolicy?: unknown;
    signal?: AbortSignal;
  }): Promise<{
    json: {
      session: SessionMetaData;
    };
  }>;
}
//#endregion
export { NotSupportedError, WebixApiClient };
//# sourceMappingURL=webix-client.d.ts.map