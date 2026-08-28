# FPL API documentation

Unofficial OpenAPI documentation for the Fantasy Premier League API, authored in
[OMG](https://omg.gs) and published with [Docusaurus](https://docusaurus.io) and
[Speccy](https://github.com/mcclowes/speccy).

Base URL: `https://fantasy.premierleague.com/api/`

## npm package

The generated OpenAPI document is published as `@mcclowes/fpl-api-spec`:

```bash
npm install @mcclowes/fpl-api-spec
```

Resolve the YAML file from Node.js without depending on the package's internal
directory layout:

```js
const openapiPath = require.resolve('@mcclowes/fpl-api-spec/openapi.yaml');
```

Tools that accept package-relative paths can use
`node_modules/@mcclowes/fpl-api-spec/static/openapi.yaml` directly.

## Overview

The FPL API provides access to:

- Player statistics and performance data
- Team information and standings
- Gameweek data and fixtures
- Manager profiles and history
- League standings and competitions
- Live match data

## Endpoints documented

| Endpoint | Description |
|----------|-------------|
| [`/bootstrap-static/`](endpoints/bootstrap-static.omg.md) | Core game data (players, teams, gameweeks) |
| [`/fixtures/`](endpoints/fixtures.omg.md) | Match fixtures and results |
| [`/element-summary/{element_id}/`](endpoints/element-summary.omg.md) | Individual player details |
| [`/event/{event_id}/live/`](endpoints/event-live.omg.md) | Live gameweek data |
| [`/entry/{manager_id}/`](endpoints/entry.omg.md) | Manager profile |
| [`/entry/{manager_id}/history/`](endpoints/entry-history.omg.md) | Manager history |
| [`/entry/{manager_id}/transfers/`](endpoints/entry-transfers.omg.md) | Manager transfers |
| [`/entry/{manager_id}/event/{event_id}/picks/`](endpoints/entry-picks.omg.md) | Manager gameweek picks |
| [`/leagues-classic/{league_id}/standings/`](endpoints/leagues-classic.omg.md) | Classic league standings |
| [`/leagues-h2h-matches/league/{league_id}/`](endpoints/leagues-h2h.omg.md) | H2H league matches |
| [`/event-status/`](endpoints/event-status.omg.md) | Gameweek status |
| [`/dream-team/{event_id}/`](endpoints/dream-team.omg.md) | Dream team for gameweek |
| [`/dream-team/`](endpoints/season-dream-team.omg.md) | Dream team for the season to date |
| [`/regions/`](endpoints/regions.omg.md) | Manager profile regions and countries |
| [`/team/set-piece-notes/`](endpoints/set-piece-notes.omg.md) | Set piece taker info |
| [`/my-team/{manager_id}/`](endpoints/my-team.omg.md) | Authenticated user's team |
| [`/me/`](endpoints/me.omg.md) | Current user profile (session optional) |
| [`/entry/{manager_id}/transfers-latest/`](endpoints/entry-transfers-latest.omg.md) | Authenticated user's current-gameweek transfers |
| [`/stats/best-classic-private-leagues/`](endpoints/best-classic-private-leagues.omg.md) | Highest-scoring private classic leagues |
| [`/stats/most-valuable-teams/`](endpoints/most-valuable-teams.omg.md) | Most valuable teams |
| [`/league/{league_id}/cup-status/`](endpoints/cup-status.omg.md) | League cup status |

## Local development

Needs Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site into build/
```

The reference is at `/api`. The OpenAPI document is served at `/openapi.yaml`
with permissive CORS, so tooling can fetch it directly, and the Speccy plugin
republishes a copy at `/api/openapi.yaml`.

## TypeScript client

The generated client lives in [`sdk/`](sdk/README.md). It provides a strict,
Fetch-based API with types generated from the committed OpenAPI document.

```bash
npm --prefix sdk install
npm run generate:sdk
npm run check:sdk
```

## Editing the spec

`static/openapi.yaml` is **generated**. Editing it directly will be overwritten.
The sources are OMG markdown:

```text
api.omg.md            info, servers, security, tag definitions
endpoints/*.omg.md    one file per endpoint
types/*.omg.md        shared schemas
```

```bash
npm run lint        # lint the OMG sources
npm run build:spec  # regenerate static/openapi.yaml
npm run lint:spec   # Speccy API health rules over the generated document
npm run diff:spec   # breaking-change diff against origin/main
```

Commit the OMG source and the regenerated `static/openapi.yaml` together. See
[docs/contributing.md](docs/contributing.md) for conventions.

## Project structure

```text
api.omg.md            Main API configuration
endpoints/            One file per endpoint (*.omg.md)
types/                Shared schema definitions (*.omg.md)
static/openapi.yaml   Built OpenAPI spec (committed)
docs/                 Guides rendered alongside the reference
examples/reqon/       Ingest missions showing the API used at volume
src/                  Docusaurus landing page and theme CSS
docusaurus.config.ts  Site and Speccy plugin configuration
```

## Deployment

Vercel, configured in `vercel.json`. Any static host works — upload `build/`.

The first version must be published locally with `npm publish --access public`.
Once the package exists on npm, configure its trusted publisher for the
`mcclowes/fpl-oas` repository and `publish-npm.yml` workflow. Later GitHub
Releases will publish through OIDC, without an npm token. The release tag must
match the version in `package.json`, prefixed with `v`, such as `v1.0.0`.

## Authentication

Most endpoints are public. `/my-team/{manager_id}/` and
`/entry/{manager_id}/transfers-latest/` need session cookies from logging into
fantasy.premierleague.com. `/me/` accepts a session but returns an anonymous
response without one. See [docs/authentication.md](docs/authentication.md).

## Disclaimer

This is unofficial, community-maintained documentation. The Premier League does
not provide official API documentation, and endpoints may change without notice.

## Resources

- [Oliver Looney's FPL API guide](https://www.oliverlooney.com/blogs/FPL-APIs-Explained)
- [FPL Python wrapper](https://fpl.readthedocs.io/)
- [Postman FPL collection](https://www.postman.com/fplassist/fpl-assist/collection/zqlmv01/fantasy-premier-league-api)

## License

MIT
