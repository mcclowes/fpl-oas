# FPL API documentation

Unofficial OpenAPI documentation for the Fantasy Premier League API, built with OMG and Scalar.

## Tech stack

- **OMG** (`omg-md-cli`) - Markdown-based OpenAPI spec authoring
- **Scalar** - API documentation UI
- **Vercel** - Static hosting

## Project structure

```
api.omg.md           # Main API config (servers, info, security)
endpoints/           # One file per endpoint (*.omg.md)
types/               # Shared schema definitions (*.omg.md)
dist/                # Build output (openapi.yaml + index.html)
```

## Commands

```bash
npm run build      # Build OpenAPI spec from OMG files
npm run lint       # Lint OMG files
npm run preview    # Preview docs with Scalar CLI
npm run serve      # Serve dist folder locally
```

## Adding endpoints

1. Create `endpoints/{endpoint-name}.omg.md`
2. Use existing files as templates
3. Reference shared types from `types/` directory
4. Run `npm run build` to regenerate spec

## Conventions

- Parameter names: `{manager_id}`, `{element_id}`, `{event_id}`, `{league_id}`
- All endpoints documented are GET requests
- Authenticated endpoints: `/me/`, `/my-team/{manager_id}/`
