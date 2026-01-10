# FPL API documentation

Unofficial API documentation for the Fantasy Premier League (FPL) API, built with [OMG](https://omg.gs) and [Scalar](https://scalar.com).

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
| `/element-summary/{element_id}/` | Individual player details |
| `/event/{event_id}/live/` | Live gameweek data |
| `/entry/{manager_id}/` | Manager profile |
| `/entry/{manager_id}/history/` | Manager history |
| `/entry/{manager_id}/transfers/` | Manager transfers |
| `/entry/{manager_id}/event/{event_id}/picks/` | Manager gameweek picks |
| `/leagues-classic/{league_id}/standings/` | Classic league standings |
| `/leagues-h2h-matches/league/{league_id}/` | H2H league matches |
| `/event-status/` | Gameweek status |
| `/dream-team/{event_id}/` | Dream team for gameweek |
| `/team/set-piece-notes/` | Set piece taker info |
| `/my-team/{manager_id}/` | Authenticated user's team |
| `/me/` | Authenticated user profile |
| `/stats/most-valuable-teams/` | Most valuable teams |
| `/league/{league_id}/cup-status/` | League cup status |

## Local development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
npm install
```

### Development server

```bash
npm run dev
```

Open http://localhost:5173

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Deployment

### Vercel

1. Connect your repository to Vercel
2. Deploy (config is in `vercel.json`)

### Static hosting

Upload the contents of the `dist` folder to any static hosting provider.

## Project structure

```
fpl-oas/
├── src/                     # React app source
│   ├── App.tsx              # Scalar component wrapper
│   ├── main.tsx             # Entry point
│   └── index.css            # Minimal styles
├── public/
│   └── openapi.yaml         # Built OpenAPI spec (committed)
├── api.omg.md               # Main API configuration
├── endpoints/               # Individual endpoint definitions
│   ├── bootstrap-static.omg.md
│   ├── fixtures.omg.md
│   └── ...
├── types/                   # Shared type definitions
│   ├── Player.omg.md
│   ├── Team.omg.md
│   └── ...
├── dist/                    # Vite build output (gitignored)
└── package.json
```

## Authentication

Most endpoints are public. Some endpoints require authentication:
- `/my-team/{manager_id}/`
- `/me/`
- `/entry/{manager_id}/transfers-latest/`

Authentication is handled via session cookies from logging into fantasy.premierleague.com.

## Disclaimer

This is unofficial, community-maintained documentation. The Premier League does not provide official API documentation, and endpoints may change without notice.

## Resources

- [Oliver Looney's FPL API guide](https://www.oliverlooney.com/blogs/FPL-APIs-Explained)
- [FPL Python wrapper](https://fpl.readthedocs.io/)
- [Postman FPL collection](https://www.postman.com/fplassist/fpl-assist/collection/zqlmv01/fantasy-premier-league-api)

## License

MIT
