---
name: Fantasy Premier League API
version: 2025.1.0
baseUrl: https://fantasy.premierleague.com/api
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

This unofficial specification documents the API used by the official Fantasy Premier League website. Use it to read players, clubs, fixtures, gameweeks, managers, leagues, picks, transfers, and live scores. The upstream API is undocumented and may change without notice.

## Base URL

Send requests to `https://fantasy.premierleague.com/api/`. IDs are numeric and shared across related endpoints: `element` means player, `entry` means manager, and `event` means gameweek. Money values are usually integers in tenths of a million pounds, so `now_cost: 75` means £7.5m. Decimal statistics are often returned as strings.

## Authentication

Most endpoints are publicly accessible. Some endpoints (marked with a lock icon) require authentication via session cookies obtained by logging into the FPL website.

## Rate Limiting

The API does not publish official rate limits, but excessive requests may result in temporary blocks. Please be respectful of the service.
