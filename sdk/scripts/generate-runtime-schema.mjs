import { readFile, writeFile } from "node:fs/promises";

import { parse } from "yaml";

const input = new URL("../../static/openapi.yaml", import.meta.url);
const output = new URL("../src/runtime-schema.gen.json", import.meta.url);
const document = parse(await readFile(input, "utf8"));

function rewriteReferences(value) {
  if (Array.isArray(value)) return value.map(rewriteReferences);
  if (!value || typeof value !== "object") return value;

  const rewritten = Object.fromEntries(
    Object.entries(value).map(([key, child]) => [
      key,
      key === "$ref" && typeof child === "string"
        ? child.replace("#/components/schemas/", "#/$defs/")
        : rewriteReferences(child),
    ]),
  );

  if (rewritten.nullable === true) {
    const { nullable: _, ...schema } = rewritten;
    return { anyOf: [schema, { type: "null" }] };
  }

  return rewritten;
}

const responses = [];
for (const [path, pathItem] of Object.entries(document.paths ?? {})) {
  for (const method of ["get", "post", "put", "patch", "delete", "head"]) {
    const operation = pathItem[method];
    if (!operation) continue;

    for (const [status, response] of Object.entries(operation.responses ?? {})) {
      const schema = response.content?.["application/json"]?.schema;
      if (schema) {
        responses.push({
          method: method.toUpperCase(),
          path,
          schema: rewriteReferences(schema),
          status,
        });
      }
    }
  }
}

const generated = {
  $defs: rewriteReferences(document.components?.schemas ?? {}),
  $id: "https://fpl-oas.dev/runtime-schema.json",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  responses,
};

await writeFile(output, `${JSON.stringify(generated, null, 2)}\n`);
