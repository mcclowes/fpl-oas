# FPL TypeScript client

A small, type-safe Fetch client generated from this repository's OpenAPI document.

## Install

```bash
npm install @mcclowes/fpl-api-client
```

## Use

```ts
import { createFplSdk } from "@mcclowes/fpl-api-client";

const fpl = createFplSdk();
const { data, error, response } = await fpl.getPlayerSummary(351);

if (error) throw new Error(`FPL returned ${response.status}`);
console.log(data.fixtures);
```

Paths, parameters, successful responses, and documented errors are inferred from
the OpenAPI document. The package also exports `paths`, `operations`, and
`components` for code that only needs schema types.

Every operation has a named helper. The underlying `openapi-fetch` client remains
available as `fpl.client` for per-request options and direct path-based calls.

## Authentication

The client uses `credentials: "include"` by default. Browser code still can't call
FPL's private endpoints directly because FPL doesn't allow cross-origin requests.
Call those endpoints from a server and provide the session cookie through request
headers. Never ship an FPL session cookie to browser code or write it to logs.

```ts
const fpl = createFplClient({
  headers: { cookie: process.env.FPL_SESSION_COOKIE! },
});

const { data, error } = await fpl.GET("/my-team/{manager_id}/", {
  params: { path: { manager_id: 1234567 } },
});
```

## Regenerate

The generated schema is committed so consumers don't need the generator. After
changing the OAS, run:

```bash
npm run generate:sdk
npm run check:sdk
```

`check:sdk` catches generated-code drift, then type-checks and builds ESM,
CommonJS, declarations, and source maps.
