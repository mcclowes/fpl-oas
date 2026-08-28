import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { compileToOpenApi, serialize } from 'omg-compiler';
import { loadApi } from 'omg-parser';

const inputPath = resolve(process.argv[2] ?? 'api.omg.md');
const outputPath = resolve(process.argv[3] ?? 'static/openapi.yaml');

const api = loadApi(inputPath);

function promoteDescriptions(type, seen = new Set()) {
  if (!type || seen.has(type)) return;
  seen.add(type);

  const description = type.annotations?.find(({ name }) => name === 'description');
  if (description && typeof description.args[0] === 'string') {
    type.description = description.args[0];
  }

  if (type.kind === 'object') {
    Object.values(type.properties).forEach((property) => promoteDescriptions(property, seen));
  } else if (type.kind === 'array') {
    promoteDescriptions(type.items, seen);
  } else if (type.kind === 'union' || type.kind === 'intersection') {
    type.types.forEach((member) => promoteDescriptions(member, seen));
  }
}

Object.values(api.types).forEach((type) => promoteDescriptions(type));
for (const endpoint of api.endpoints) {
  Object.values(endpoint.parameters).forEach((schema) => promoteDescriptions(schema));
  promoteDescriptions(endpoint.requestBody);
  Object.values(endpoint.responses).forEach(({ schema }) => promoteDescriptions(schema));
}

const openapi = compileToOpenApi(api);
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, serialize(openapi, outputPath.endsWith('.json') ? 'json' : 'yaml'));

console.error(`Built ${api.endpoints.length} endpoints into ${outputPath}`);
