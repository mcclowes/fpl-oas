---
openapi: 3.1.0
title: Fantasy Premier League API
version: 2025.1.0
description: |
  Unofficial documentation for the Fantasy Premier League (FPL) API.

  The FPL API provides access to player statistics, team data, gameweek information,
  manager details, league standings, and more for the official Fantasy Premier League game.

  **Note:** This is an unofficial, community-documented API. The Premier League does not
  provide official API documentation, and endpoints may change without notice.
servers:
  - url: https://fantasy.premierleague.com/api
    description: Production FPL API
tags:
  - name: General
    description: Core game data and bootstrap information
  - name: Players
    description: Player statistics and summaries
  - name: Fixtures
    description: Match fixtures and results
  - name: Managers
    description: Manager/team owner data and history
  - name: Leagues
    description: League standings and competitions
  - name: Live
    description: Live gameweek data
  - name: Stats
    description: Game statistics and leaderboards
---

# Fantasy Premier League API

The official Fantasy Premier League game API provides comprehensive data about the English Premier League fantasy football game.

## Base URL

All endpoints use the base URL: `https://fantasy.premierleague.com/api/`

## Authentication

Most endpoints are publicly accessible. Some endpoints (marked with a lock icon) require authentication via session cookies obtained by logging into the FPL website.

## Rate Limiting

The API does not publish official rate limits, but excessive requests may result in temporary blocks. Please be respectful of the service.

```omg.config
{ baseUrl: "https://fantasy.premierleague.com/api" }
```
