---
method: GET
path: /leagues-classic/{league_id}/standings/
operationId: getLeagueClassicStandings
tags: [Leagues]
---

# Get classic league standings

Returns standings for a classic scoring league, including manager rankings and points.

```omg.path
{
  league_id: integer @description("Classic league ID")
}
```

```omg.query
{
  page_standings: integer? @min(1) @description("Page number for pagination"),
  page_new_entries: integer? @min(1) @description("Page number for new entries")
}
```

```omg.response
{
  new_entries: {
    has_next: boolean,
    page: integer,
    results: [{
      id: integer,
      entry_name: string,
      player_first_name: string,
      player_last_name: string,
      joined_time: string @format("date-time"),
      entry: integer
    }]
  },
  last_updated_data: string @format("date-time"),
  league: {
    id: integer,
    name: string,
    created: string @format("date-time"),
    closed: boolean,
    max_entries: integer?,
    league_type: "x" | "s" | "c" @description("x=private, s=global, c=country"),
    scoring: "c" | "h" @description("c=classic, h=head-to-head"),
    admin_entry: integer? @description("Manager ID of league admin"),
    start_event: integer,
    code_privacy: "p" | "a" @description("p=private code, a=admin-only invites"),
    has_cup: boolean,
    cup_league: integer?,
    rank: integer?
  },
  standings: {
    has_next: boolean,
    page: integer,
    results: [{
      id: integer,
      event_total: integer @description("Points this gameweek"),
      player_name: string,
      rank: integer,
      last_rank: integer,
      rank_sort: integer,
      total: integer @description("Total points"),
      entry: integer @description("Manager ID"),
      entry_name: string @description("Team name")
    }]
  }
}
```
