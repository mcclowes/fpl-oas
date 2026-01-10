# FPL API documentation

Unofficial API documentation for the Fantasy Premier League (FPL) API, built with [OMG](https://omg.gs) and deployed with [Scalar](https://scalar.com).

## Overview

The FPL API provides access to:
- Player statistics and performance data
- Team information and standings
- Gameweek data and fixtures
- Manager profiles and history
- League standings and competitions
- Live match data

Base URL: `https://fantasy.premierleague.com/api/`

## Endpoints documented

| Endpoint | Description |
|----------|-------------|
| `/bootstrap-static/` | Core game data (players, teams, gameweeks) |
| `/fixtures/` | Match fixtures and results |
| `/element-summary/{id}/` | Individual player details |
| `/event/{id}/live/` | Live gameweek data |
| `/entry/{id}/` | Manager profile |
| `/entry/{id}/history/` | Manager history |
| `/entry/{id}/transfers/` | Manager transfers |
| `/entry/{id}/event/{id}/picks/` | Manager gameweek picks |
| `/leagues-classic/{id}/standings/` | Classic league standings |
| `/leagues-h2h-matches/league/{id}/` | H2H league matches |
| `/event-status/` | Gameweek status |
| `/dream-team/{id}/` | Dream team for gameweek |
| `/team/set-piece-notes/` | Set piece taker info |
| `/my-team/{id}/` | Authenticated user's team |
| `/me/` | Authenticated user profile |
| `/stats/most-valuable-teams/` | Most valuable teams |
| `/league/{id}/cup-status/` | League cup status |

## Local development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
npm install
```

### Build OpenAPI spec

```bash
npm run build
```

### Preview documentation

```bash
npm run preview
```

Or serve the dist folder:

```bash
npm run serve
```

Then open http://localhost:3000

## Deployment

### Vercel

1. Connect your repository to Vercel
2. Set build output to `dist`
3. Deploy

### Static hosting

Upload the contents of the `dist` folder to any static hosting provider.

## Project structure

```
fpl-oas/
├── api.omg.md           # Main API configuration
├── endpoints/           # Individual endpoint definitions
│   ├── bootstrap-static.omg.md
│   ├── fixtures.omg.md
│   └── ...
├── types/               # Shared type definitions
│   ├── Player.omg.md
│   ├── Team.omg.md
│   └── ...
├── dist/                # Built output
│   ├── openapi.yaml     # Generated OpenAPI spec
│   └── index.html       # Scalar documentation
└── package.json
```

## Authentication

Most endpoints are public. Some endpoints require authentication:
- `/my-team/{id}/`
- `/me/`
- `/entry/{id}/transfers-latest/`

Authentication is handled via session cookies from logging into fantasy.premierleague.com.

## Disclaimer

This is unofficial, community-maintained documentation. The Premier League does not provide official API documentation, and endpoints may change without notice.

## Resources

- [Oliver Looney's FPL API guide](https://www.oliverlooney.com/blogs/FPL-APIs-Explained)
- [FPL Python wrapper](https://fpl.readthedocs.io/)
- [Postman FPL collection](https://www.postman.com/fplassist/fpl-assist/collection/zqlmv01/fantasy-premier-league-api)

## License

MIT
