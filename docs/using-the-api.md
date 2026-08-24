---
id: using-the-api
title: Using the API
sidebar_position: 1
---

# Using the API

The Fantasy Premier League game is backed by a JSON API at
`https://fantasy.premierleague.com/api/`. It is undocumented — the Premier League
publishes no description of it and makes no compatibility promise — but it is
public, stable in practice, and the source behind every third-party FPL tool.

This site is the description that doesn't exist upstream. The full reference is
at [`/api`](/api); the OpenAPI document itself is at
[`openapi.yaml`](pathname:///openapi.yaml), served with permissive CORS so you
can point tooling straight at it.

## Where to start

Almost everything begins with
[`/bootstrap-static/`](/api/getbootstrapstatic). One request returns the whole
static picture of the season:

- `elements` — every player, with prices, ownership, form, and season totals
- `teams` — the 20 clubs and their attack/defence strength ratings
- `events` — the 38 gameweeks, their deadlines, and which one is current
- `element_types` — the four positions
- `game_settings` — squad rules, transfer costs, league size limits

It is a large payload and it changes slowly. Fetch it once, cache it, and derive
what you can rather than re-requesting.

The other endpoints hang off ids found in it: `element_id` for a player,
`event_id` for a gameweek, `team` for a club.

## Common paths through the data

**A player's season.** [`/element-summary/{element_id}/`](/api/getelementsummary)
returns per-gameweek history for the current season, plus totals for previous
ones.

**A gameweek's scores.** [`/event/{event_id}/live/`](/api/geteventlive) returns
every player's points for that gameweek in a single request — including the stat
breakdown that produced them. It is the cheapest way to score a whole gameweek.

**A manager.** [`/entry/{manager_id}/`](/api/getentry) is the profile and current
standing; [`/entry/{manager_id}/history/`](/api/getentryhistory) is their season
by season; [`/entry/{manager_id}/event/{event_id}/picks/`](/api/getentrypicks) is
the eleven they actually played.

**A league.**
[`/leagues-classic/{league_id}/standings/`](/api/getleagueclassicstandings) pages
50 managers at a time. League `314` is the Overall league, which contains every
manager in the game.

## Timing

Two facts shape most integrations.

Gameweek deadlines are in `events[].deadline_time` on `/bootstrap-static/`, as
UTC. Picks are frozen at that moment and can be read afterwards.

Final ranks lag. After a gameweek ends, FPL takes roughly an hour to publish
confirmed overall ranks, because the standings can't be computed until every
manager's score is in and the global sort has run. A manager's *own* score
appears well before their rank does. If you need a rank sooner than FPL
publishes one, you have to compute it yourself — see
[the ingest example](./ingest-example.md).

Bonus points are provisional until FPL confirms them after each match, so
anything computed at the final whistle carries that caveat.

## Rate limits

There are none published, and no rate-limit headers come back. A 429 is the only
feedback the API gives you, which makes pacing entirely the caller's problem.

Measured from a single IP, the API absorbs a burst of several thousand requests
and then sustains a high steady rate — but that is an observation, not a
guarantee, and it is not an invitation. Be conservative:

- Cache `/bootstrap-static/`; it does not need re-fetching per user action.
- Prefer the endpoint that answers your question in one request.
  [`/event/{event_id}/live/`](/api/geteventlive) scores every player at once;
  iterating `/element-summary/` over 700 players to learn the same thing is 700×
  the load.
- Never re-pull a finished gameweek. Its results do not change again.
- Pull bulk data overnight.
- Send a `User-Agent` that identifies you and gives a contact address.

## Authentication

Most endpoints are public. A few — your own team, your own profile — need a
logged-in session. See [Authentication](./authentication.md).

## Stability

This is an internal API that happens to be reachable. Fields get added, and
occasionally renamed or dropped, without notice or a version bump. Treat every
response as untrusted input: read the fields you need, tolerate the ones you
don't recognise, and fail loudly when something you depend on disappears rather
than silently coercing it.

If you spot the API doing something this description doesn't cover, the
[contributing guide](./contributing.md) explains how to fix it here.
