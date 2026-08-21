# FPL API documentation

Unofficial OpenAPI documentation for the Fantasy Premier League API, authored in
OMG and published with Docusaurus and Speccy.

## Tech stack

- **Docusaurus 3** - documentation site
- **Speccy** (`docusaurus-plugin-speccy`) - OpenAPI reference renderer at `/api`
- **OMG** (`omg-md-cli`) - Markdown-based OpenAPI spec authoring
- **Vercel** - static hosting

## Project structure

```
api.omg.md            Main API config (servers, info, security, tags)
endpoints/            One file per endpoint (*.omg.md)
types/                Shared schema definitions (*.omg.md)
static/openapi.yaml   Built OpenAPI spec (committed, generated - do not edit)
static/favicon.svg
docs/                 Guides (*.md), sidebar defined in sidebars.ts
examples/reqon/       Ingest missions kept as usage reference
src/pages/            Landing page
src/css/custom.css    Theme colours
docusaurus.config.ts  Site and plugin configuration
build/                Docusaurus output (gitignored)
```

## Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Build the site
npm run typecheck  # tsc --noEmit
npm run build:spec # Rebuild OpenAPI spec from OMG files
npm run lint       # Lint OMG files
npm run lint:spec  # Speccy API health rules over the built spec
npm run diff:spec  # Breaking-change diff against origin/main
```

## Adding endpoints

1. Create `endpoints/{endpoint-name}.omg.md`
2. Use existing files as templates
3. Reference shared types from `types/` directory
4. Run `npm run build:spec` to regenerate the spec
5. Commit the OMG source and the regenerated `static/openapi.yaml` together

## Conventions

- Parameter names: `{manager_id}`, `{element_id}`, `{event_id}`, `{league_id}`
- All endpoints documented are GET requests
- Authenticated endpoints: `/me/`, `/my-team/{manager_id}/`,
  `/entry/{manager_id}/transfers-latest/`
- Generated reference routes are the lowercased operationId, e.g.
  `getBootstrapStatic` renders at `/api/getbootstrapstatic`. Docs link to those
  paths, so renaming an operationId breaks them and the build will say so.

## Gotchas

- `static/openapi.yaml` is generated. Never hand-edit it.
- `package.json` pins Spectral's `ajv` to 8.17.1 via `overrides`. Later ajv
  generates code that Docusaurus's jiti loader mis-parses, which makes the Speccy
  plugin throw at config-load time. Remove the pin only if that is fixed
  upstream.
- The site is not `type: module`. Adding it breaks plugin loading.
