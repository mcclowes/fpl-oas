import Ajv2020, { type ErrorObject, type ValidateFunction } from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

import runtimeSchema from "./runtime-schema.gen.json";

export interface ResponseValidationIssue {
  instancePath: string;
  keyword: string;
  message?: string;
  schemaPath: string;
}

export class FplResponseValidationError extends Error {
  readonly issues: readonly ResponseValidationIssue[];
  readonly method: string;
  readonly path: string;
  readonly status: number;

  constructor(
    method: string,
    path: string,
    status: number,
    errors: readonly ErrorObject[],
  ) {
    super(`FPL returned an invalid ${status} response for ${method} ${path}`);
    this.name = "FplResponseValidationError";
    this.method = method;
    this.path = path;
    this.status = status;
    this.issues = errors.map(({ instancePath, keyword, message, schemaPath }) => ({
      instancePath,
      keyword,
      ...(message === undefined ? {} : { message }),
      schemaPath,
    }));
  }
}

interface ResponseSchema {
  method: string;
  path: string;
  schema: object;
  status: string;
}

interface CompiledResponseSchema extends ResponseSchema {
  pattern: RegExp;
  validate?: ValidateFunction;
}

function pathPattern(path: string): RegExp {
  const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|/api)${escaped.replace(/\\\{[^}]+\\\}/g, "[^/]+")}$`);
}

export function createValidationFetch(
  fetch: typeof globalThis.fetch,
): typeof globalThis.fetch {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);

  const schemas: CompiledResponseSchema[] = (
    runtimeSchema.responses as ResponseSchema[]
  ).map((response) => ({ ...response, pattern: pathPattern(response.path) }));

  return (async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init);
    const response = await fetch(request);
    const pathname = new URL(request.url).pathname;
    const schema = schemas.find(
      (candidate) =>
        candidate.method === request.method &&
        candidate.pattern.test(pathname) &&
        (candidate.status === String(response.status) || candidate.status === "default"),
    );

    if (!schema || response.status === 204) return response;
    const contentType = response.headers.get("content-type")?.toLowerCase();
    if (!contentType?.includes("json")) return response;

    schema.validate ??= ajv.compile({
      ...schema.schema,
      $defs: runtimeSchema.$defs,
      $schema: runtimeSchema.$schema,
    });
    const value: unknown = await response.clone().json();
    if (!schema.validate(value)) {
      throw new FplResponseValidationError(
        request.method,
        schema.path,
        response.status,
        schema.validate.errors ?? [],
      );
    }

    return response;
  }) as typeof globalThis.fetch;
}
