---
id: ingest-example
title: Ingest example
sidebar_position: 3
---

# Ingest example

A worked example of consuming these endpoints at volume, in case it is useful as
a reference for pacing, pagination, and choosing between endpoints.

[what-the-fpl](https://github.com/mcclowes/what-the-fpl) mirrors FPL data into
its own database using [reqon](https://github.com/mcclowes/reqon), a declarative
DSL for fetch/map/store pipelines. A mission is a `.vague` file: it declares the
source, the rate model to pace under, the loop, and where rows land. The three
missions are in [`examples/reqon/`](https://github.com/mcclowes/fpl-oas/tree/main/examples/reqon)
here.

They are included because of what they encode about *this* API, not because you
need reqon to talk to it.

## Reference data: one request, three tables

[`bootstrap.vague`](https://github.com/mcclowes/fpl-oas/blob/main/examples/reqon/bootstrap.vague)
fetches [`/bootstrap-static/`](/api/getbootstrapstatic) once and upserts three of its arrays —
`teams`, `elements`, `events` — on their FPL `id`.

Two things worth copying:

**Upsert on FPL's id.** Every entity in this API has a stable integer id, so
re-running is safe and never duplicates a row. Ingest that appends rather than
upserts will drift.

**Write teams before players.** A player's `team` is a foreign key onto a team
id, so on a cold database the teams have to land first. The mission flushes the
teams batch strictly before the players loop starts.

Note also the field renames: FPL calls them `team` and `element_type`, mapped
here to `team_id` and `position_id`. Bootstrap's names are terse and occasionally
misleading; renaming at the boundary keeps that out of the rest of the system.

## Per-manager: the expensive path, on purpose

[`managers.vague`](https://github.com/mcclowes/fpl-oas/blob/main/examples/reqon/managers.vague)
loops [`/entry/{manager_id}/`](/api/getentry) over an id range.
[`managers-full.vague`](https://github.com/mcclowes/fpl-oas/blob/main/examples/reqon/managers-full.vague)
is the same fetch tuned for the whole field.

The interesting decision is that this is deliberately *not*
[`/leagues-classic/314/standings/`](/api/getleagueclassicstandings). The Overall league contains every manager, 50
to a page — roughly 34,000 requests for the whole field instead of millions, and
it arrives pre-sorted by rank. It looks like a fiftieth of the work.

It is the wrong endpoint if you are racing the clock, and the reason is the
timing quirk described in [Using the API](./using-the-api.md). The hour FPL takes
to publish ranks after a gameweek *is* the standings endpoint recomputing. It
cannot serve a page until every score is in and the global sort has run, so
fetching it faster doesn't help — the numbers aren't there yet.

`/entry/{manager_id}/` has no such dependency. A manager's own gameweek score is
derived from their picks and the live player points, and it is available as soon
as the matches finish. Reading the *input* to the ranking rather than FPL's
output is what buys the time, and it is why the expensive path is the right one
here.

For anything not racing the clock — an overnight backfill, seeding a table out of
season — the standings endpoint is much cheaper and perfectly fine.

## Pacing

Since FPL sends no rate-limit headers, the missions model the token bucket
locally and release requests only when the modelled bucket has a token. A 429
tightens the pace automatically; quiet time eases it back.

The gentle mission is set an order of magnitude below what the API was measured
to absorb, on the grounds that a thousand managers is small enough that there is
no reason to lean on the limiter at all. That is the right default: pace to what
you need, not to what you can get away with.

## The version that barely fetches at all

Follow the reasoning one more step and the per-manager fetch mostly disappears.

Picks are fixed at the deadline, so they can be pulled at leisure in the days
before kickoff, with no clock on them. [`/event/{event_id}/live/`](/api/geteventlive) then returns
every player's points in **one request**. At the final whistle the remaining work
is one request, a join against picks you already hold, and a sort — no waiting on
FPL to compute anything per-manager.

That is the general shape of the lesson: when an endpoint is slow because it is
computing something, fetch its inputs instead and compute it yourself.
