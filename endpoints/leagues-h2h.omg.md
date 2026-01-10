---
method: GET
path: /leagues-h2h-matches/league/{league_id}/
operationId: getLeagueH2HMatches
tags: [Leagues]
---

# Get head-to-head league matches

Returns head-to-head matchups for a specific league.

```omg.path
{
  league_id: integer @description("H2H league ID")
}
```

```omg.query
{
  page: integer? @min(1) @description("Page number"),
  event: integer? @description("Filter by gameweek")
}
```

```omg.response
{
  has_next: boolean,
  page: integer,
  results: [{
    id: integer,
    entry_1_entry: integer @description("First manager ID"),
    entry_1_name: string @description("First team name"),
    entry_1_player_name: string,
    entry_1_points: integer,
    entry_1_win: integer,
    entry_1_draw: integer,
    entry_1_loss: integer,
    entry_1_total: integer @description("Total league points"),
    entry_2_entry: integer @description("Second manager ID"),
    entry_2_name: string @description("Second team name"),
    entry_2_player_name: string,
    entry_2_points: integer,
    entry_2_win: integer,
    entry_2_draw: integer,
    entry_2_loss: integer,
    entry_2_total: integer,
    is_knockout: boolean,
    league: integer,
    winner: integer?,
    seed_value: integer?,
    event: integer,
    tiebreak: string?,
    is_bye: boolean,
    knockout_name: string?
  }]
}
```
