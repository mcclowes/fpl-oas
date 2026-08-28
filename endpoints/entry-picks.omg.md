---
method: GET
path: /entry/{manager_id}/event/{event_id}/picks/
operationId: getEntryPicks
tags: [Managers]
---

# Get manager gameweek picks

Returns a manager's team selection for a specific gameweek, including captain choice, bench order, and active chips.

```omg.path
{
  manager_id: integer @description("Manager/entry ID"),
  event_id: integer @description("Gameweek number (1-38)")
}
```

```omg.response.404
ApiError
```

```omg.response
{
  active_chip: string? @description("Active chip for this gameweek (null if none)"),
  automatic_subs: [{
    entry: integer,
    element_in: integer @description("Player subbed on"),
    element_out: integer @description("Player subbed off"),
    event: integer
  }] @description("Automatic substitutions made"),
  entry_history: {
    event: integer @description("Gameweek number"),
    points: integer @description("Net gameweek points after transfer costs"),
    total_points: integer @description("Cumulative season points after this gameweek"),
    rank: integer? @description("Gameweek rank, or null before ranks are calculated"),
    rank_sort: integer? @description("Internal tie-breaking rank, or null before ranks are calculated"),
    overall_rank: integer? @description("Overall rank after this gameweek, or null before ranks are calculated"),
    percentile_rank: integer? @description("Overall-rank percentile bucket, or null before ranks are calculated"),
    bank: integer @description("Unspent budget in 0.1m units at the deadline"),
    value: integer @description("Squad value in 0.1m units at the deadline"),
    event_transfers: integer @description("Transfers made for this gameweek"),
    event_transfers_cost: integer @description("Points deducted for transfers"),
    points_on_bench: integer @description("Points scored by players left on the bench")
  } @description("Manager's score, rank, and squad value for this gameweek"),
  picks: [{
    element: integer @description("Player ID"),
    position: integer @description("Position 1-15 (1-11 starting, 12-15 bench)"),
    multiplier: integer @description("1=normal, 2=captain, 3=triple captain, 0=benched"),
    is_captain: boolean @description("Whether the player was selected as captain"),
    is_vice_captain: boolean @description("Whether the player was selected as vice-captain")
  }] @description("Ordered 15-player squad at the gameweek deadline")
}
```

```omg.example
{
  "active_chip": null,
  "automatic_subs": [],
  "picks": [
    {"element": 1, "position": 1, "multiplier": 1, "is_captain": false, "is_vice_captain": false},
    {"element": 351, "position": 2, "multiplier": 2, "is_captain": true, "is_vice_captain": false}
  ]
}
```
