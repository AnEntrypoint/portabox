import { z } from "zod";

//#region src/api-client/validators.d.ts
type SessionMetaData = z.infer<typeof Session>;
declare const Session: z.ZodObject<{
  id: z.ZodString;
  memory: z.ZodNumber;
  vcpus: z.ZodNumber;
  region: z.ZodString;
  runtime: z.ZodString;
  timeout: z.ZodNumber;
  status: z.ZodEnum<["pending", "running", "stopping", "stopped", "failed", "aborted", "snapshotting"]>;
  requestedAt: z.ZodNumber;
  startedAt: z.ZodOptional<z.ZodNumber>;
  requestedStopAt: z.ZodOptional<z.ZodNumber>;
  stoppedAt: z.ZodOptional<z.ZodNumber>;
  abortedAt: z.ZodOptional<z.ZodNumber>;
  duration: z.ZodOptional<z.ZodNumber>;
  sourceSnapshotId: z.ZodOptional<z.ZodString>;
  snapshottedAt: z.ZodOptional<z.ZodNumber>;
  createdAt: z.ZodNumber;
  cwd: z.ZodString;
  updatedAt: z.ZodNumber;
  interactivePort: z.ZodOptional<z.ZodNumber>;
  networkPolicy: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
    mode: z.ZodLiteral<"allow-all">;
  }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    mode: z.ZodLiteral<"allow-all">;
  }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    mode: z.ZodLiteral<"allow-all">;
  }, z.ZodTypeAny, "passthrough">>, z.ZodObject<{
    mode: z.ZodLiteral<"deny-all">;
  }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    mode: z.ZodLiteral<"deny-all">;
  }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    mode: z.ZodLiteral<"deny-all">;
  }, z.ZodTypeAny, "passthrough">>]>, z.ZodObject<{
    mode: z.ZodLiteral<"custom">;
    allowedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    allowedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    deniedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    injectionRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
      headerNames: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
    forwardRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      forwardURL: z.ZodString;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
  }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    mode: z.ZodLiteral<"custom">;
    allowedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    allowedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    deniedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    injectionRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
      headerNames: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
    forwardRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      forwardURL: z.ZodString;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
  }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    mode: z.ZodLiteral<"custom">;
    allowedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    allowedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    deniedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    injectionRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
      headerNames: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
    forwardRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      forwardURL: z.ZodString;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
  }, z.ZodTypeAny, "passthrough">>]>>;
  activeCpuDurationMs: z.ZodOptional<z.ZodNumber>;
  networkTransfer: z.ZodOptional<z.ZodObject<{
    ingress: z.ZodNumber;
    egress: z.ZodNumber;
  }, "strip", z.ZodTypeAny, {
    ingress: number;
    egress: number;
  }, {
    ingress: number;
    egress: number;
  }>>;
}, "strip", z.ZodTypeAny, {
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
  networkPolicy?: z.objectOutputType<{
    mode: z.ZodLiteral<"allow-all">;
  }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
    mode: z.ZodLiteral<"deny-all">;
  }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
    mode: z.ZodLiteral<"custom">;
    allowedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    allowedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    deniedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    injectionRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
      headerNames: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
    forwardRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      forwardURL: z.ZodString;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
  }, z.ZodTypeAny, "passthrough"> | undefined;
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
}, {
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
  networkPolicy?: z.objectInputType<{
    mode: z.ZodLiteral<"allow-all">;
  }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
    mode: z.ZodLiteral<"deny-all">;
  }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
    mode: z.ZodLiteral<"custom">;
    allowedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    allowedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    deniedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    injectionRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
      headerNames: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
    forwardRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      forwardURL: z.ZodString;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
  }, z.ZodTypeAny, "passthrough"> | undefined;
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
}>;
type SandboxRouteData = z.infer<typeof SandboxRoute>;
declare const SandboxRoute: z.ZodObject<{
  url: z.ZodString;
  subdomain: z.ZodString;
  port: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
  url: string;
  subdomain: string;
  port: number;
}, {
  url: string;
  subdomain: string;
  port: number;
}>;
type SnapshotMetadata = z.infer<typeof Snapshot>;
declare const Snapshot: z.ZodObject<{
  id: z.ZodString;
  sourceSessionId: z.ZodString;
  region: z.ZodString;
  status: z.ZodEnum<["created", "deleted", "failed"]>;
  sizeBytes: z.ZodNumber;
  expiresAt: z.ZodOptional<z.ZodNumber>;
  createdAt: z.ZodNumber;
  updatedAt: z.ZodNumber;
  lastUsedAt: z.ZodOptional<z.ZodNumber>;
  creationMethod: z.ZodOptional<z.ZodString>;
  parentId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
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
}, {
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
}>;
type CommandData = z.infer<typeof Command>;
declare const Command: z.ZodObject<{
  id: z.ZodString;
  name: z.ZodString;
  args: z.ZodArray<z.ZodString, "many">;
  cwd: z.ZodString;
  sessionId: z.ZodString;
  exitCode: z.ZodNullable<z.ZodNumber>;
  startedAt: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
  name: string;
  id: string;
  startedAt: number;
  cwd: string;
  args: string[];
  sessionId: string;
  exitCode: number | null;
}, {
  name: string;
  id: string;
  startedAt: number;
  cwd: string;
  args: string[];
  sessionId: string;
  exitCode: number | null;
}>;
type CommandFinishedData = z.infer<typeof CommandFinishedResponse>["command"];
declare const CommandFinishedResponse: z.ZodObject<{
  command: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    args: z.ZodArray<z.ZodString, "many">;
    cwd: z.ZodString;
    sessionId: z.ZodString;
    startedAt: z.ZodNumber;
  } & {
    exitCode: z.ZodNumber;
  }, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    startedAt: number;
    cwd: string;
    args: string[];
    sessionId: string;
    exitCode: number;
  }, {
    name: string;
    id: string;
    startedAt: number;
    cwd: string;
    args: string[];
    sessionId: string;
    exitCode: number;
  }>;
}, "strip", z.ZodTypeAny, {
  command: {
    name: string;
    id: string;
    startedAt: number;
    cwd: string;
    args: string[];
    sessionId: string;
    exitCode: number;
  };
}, {
  command: {
    name: string;
    id: string;
    startedAt: number;
    cwd: string;
    args: string[];
    sessionId: string;
    exitCode: number;
  };
}>;
declare const SnapshotTreeNode: z.ZodObject<{
  snapshot: z.ZodObject<{
    id: z.ZodString;
    sourceSessionId: z.ZodString;
    region: z.ZodString;
    status: z.ZodEnum<["created", "deleted", "failed"]>;
    sizeBytes: z.ZodNumber;
    expiresAt: z.ZodOptional<z.ZodNumber>;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNumber;
    lastUsedAt: z.ZodOptional<z.ZodNumber>;
    creationMethod: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodString>;
  }, "strip", z.ZodTypeAny, {
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
  }, {
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
  }>;
  siblings: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    sourceSessionId: z.ZodString;
    region: z.ZodString;
    status: z.ZodEnum<["created", "deleted", "failed"]>;
    sizeBytes: z.ZodNumber;
    expiresAt: z.ZodOptional<z.ZodNumber>;
    createdAt: z.ZodNumber;
    updatedAt: z.ZodNumber;
    lastUsedAt: z.ZodOptional<z.ZodNumber>;
    creationMethod: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodString>;
  }, "strip", z.ZodTypeAny, {
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
  }, {
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
  }>, "many">;
  count: z.ZodString;
}, "strip", z.ZodTypeAny, {
  count: string;
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
  siblings: {
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
}, {
  count: string;
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
  siblings: {
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
}>;
type SnapshotTreeNodeData = z.infer<typeof SnapshotTreeNode>;
declare const Sandbox: z.ZodObject<{
  name: z.ZodString;
  persistent: z.ZodBoolean;
  region: z.ZodOptional<z.ZodString>;
  vcpus: z.ZodOptional<z.ZodNumber>;
  memory: z.ZodOptional<z.ZodNumber>;
  runtime: z.ZodOptional<z.ZodString>;
  timeout: z.ZodOptional<z.ZodNumber>;
  networkPolicy: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
    mode: z.ZodLiteral<"allow-all">;
  }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    mode: z.ZodLiteral<"allow-all">;
  }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    mode: z.ZodLiteral<"allow-all">;
  }, z.ZodTypeAny, "passthrough">>, z.ZodObject<{
    mode: z.ZodLiteral<"deny-all">;
  }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    mode: z.ZodLiteral<"deny-all">;
  }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    mode: z.ZodLiteral<"deny-all">;
  }, z.ZodTypeAny, "passthrough">>]>, z.ZodObject<{
    mode: z.ZodLiteral<"custom">;
    allowedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    allowedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    deniedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    injectionRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
      headerNames: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
    forwardRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      forwardURL: z.ZodString;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
  }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    mode: z.ZodLiteral<"custom">;
    allowedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    allowedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    deniedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    injectionRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
      headerNames: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
    forwardRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      forwardURL: z.ZodString;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
  }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    mode: z.ZodLiteral<"custom">;
    allowedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    allowedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    deniedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    injectionRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
      headerNames: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
    forwardRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      forwardURL: z.ZodString;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
  }, z.ZodTypeAny, "passthrough">>]>>;
  totalEgressBytes: z.ZodOptional<z.ZodNumber>;
  totalIngressBytes: z.ZodOptional<z.ZodNumber>;
  totalActiveCpuDurationMs: z.ZodOptional<z.ZodNumber>;
  totalDurationMs: z.ZodOptional<z.ZodNumber>;
  createdAt: z.ZodNumber;
  updatedAt: z.ZodNumber;
  currentSessionId: z.ZodString;
  currentSnapshotId: z.ZodOptional<z.ZodString>;
  status: z.ZodEnum<["pending", "running", "stopping", "stopped", "failed", "aborted", "snapshotting"]>;
  statusUpdatedAt: z.ZodOptional<z.ZodNumber>;
  cwd: z.ZodOptional<z.ZodString>;
  tags: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
  snapshotExpiration: z.ZodOptional<z.ZodNumber>;
  keepLastSnapshots: z.ZodOptional<z.ZodObject<{
    count: z.ZodNumber;
    expiration: z.ZodOptional<z.ZodNumber>;
    deleteEvicted: z.ZodOptional<z.ZodBoolean>;
  }, "strip", z.ZodTypeAny, {
    count: number;
    expiration?: number | undefined;
    deleteEvicted?: boolean | undefined;
  }, {
    count: number;
    expiration?: number | undefined;
    deleteEvicted?: boolean | undefined;
  }>>;
}, "strip", z.ZodTypeAny, {
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
  networkPolicy?: z.objectOutputType<{
    mode: z.ZodLiteral<"allow-all">;
  }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
    mode: z.ZodLiteral<"deny-all">;
  }, z.ZodTypeAny, "passthrough"> | z.objectOutputType<{
    mode: z.ZodLiteral<"custom">;
    allowedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    allowedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    deniedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    injectionRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
      headerNames: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
    forwardRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      forwardURL: z.ZodString;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
  }, z.ZodTypeAny, "passthrough"> | undefined;
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
}, {
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
  networkPolicy?: z.objectInputType<{
    mode: z.ZodLiteral<"allow-all">;
  }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
    mode: z.ZodLiteral<"deny-all">;
  }, z.ZodTypeAny, "passthrough"> | z.objectInputType<{
    mode: z.ZodLiteral<"custom">;
    allowedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    allowedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    deniedCIDRs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    injectionRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
      headerNames: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
    forwardRules: z.ZodOptional<z.ZodArray<z.ZodObject<{
      domain: z.ZodString;
      forwardURL: z.ZodString;
      match: z.ZodOptional<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
          exact: z.ZodOptional<z.ZodString>;
          startsWith: z.ZodOptional<z.ZodString>;
          regex: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }, {
          exact?: string | undefined;
          startsWith?: string | undefined;
          regex?: string | undefined;
        }>>;
        method: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        queryString: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
        headers: z.ZodOptional<z.ZodArray<z.ZodObject<{
          key: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
          value: z.ZodOptional<z.ZodObject<{
            exact: z.ZodOptional<z.ZodString>;
            startsWith: z.ZodOptional<z.ZodString>;
            regex: z.ZodOptional<z.ZodString>;
          }, "strip", z.ZodTypeAny, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }, {
            exact?: string | undefined;
            startsWith?: string | undefined;
            regex?: string | undefined;
          }>>;
        }, "strip", z.ZodTypeAny, {
          value?: {
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
      }, "strip", z.ZodTypeAny, {
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
    }, "strip", z.ZodTypeAny, {
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
  }, z.ZodTypeAny, "passthrough"> | undefined;
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
}>;
type SandboxMetaData = z.infer<typeof Sandbox>;
//#endregion
export { Command, CommandData, CommandFinishedData, CommandFinishedResponse, Sandbox, SandboxMetaData, SandboxRoute, SandboxRouteData, Session, SessionMetaData, Snapshot, SnapshotMetadata, SnapshotTreeNode, SnapshotTreeNodeData };
//# sourceMappingURL=validators.d.cts.map