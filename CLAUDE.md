# FPL API documentation

Unofficial OpenAPI documentation for the Fantasy Premier League API, built with OMG, React, and Scalar.

## Tech stack

- **Vite + React** - Minimal React app for documentation UI
- **Scalar** (`@scalar/api-reference-react`) - API documentation component
- **OMG** (`omg-md-cli`) - Markdown-based OpenAPI spec authoring
- **Vercel** - Static hosting

## Project structure

```
src/                 # React app source
  App.tsx            # Scalar component wrapper
  main.tsx           # Entry point
  index.css          # Minimal styles
public/
  openapi.yaml       # Built OpenAPI spec (committed)
api.omg.md           # Main API config (servers, info, security)
endpoints/           # One file per endpoint (*.omg.md)
types/               # Shared schema definitions (*.omg.md)
dist/                # Vite build output (gitignored)
```

## Commands

```bash
npm run dev        # Start dev server (localhost:5173)
npm run build      # Build for production
npm run build:spec # Rebuild OpenAPI spec from OMG files
npm run lint       # Lint OMG files
npm run preview    # Preview production build
```

## Adding endpoints

1. Create `endpoints/{endpoint-name}.omg.md`
2. Use existing files as templates
3. Reference shared types from `types/` directory
4. Run `npm run build:spec` to regenerate spec

## Conventions

- Parameter names: `{manager_id}`, `{element_id}`, `{event_id}`, `{league_id}`
- All endpoints documented are GET requests
- Authenticated endpoints: `/me/`, `/my-team/{manager_id}/`
