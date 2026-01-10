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
    event: integer,
    points: integer,
    total_points: integer,
    rank: integer?,
    rank_sort: integer?,
    overall_rank: integer?,
    percentile_rank: integer?,
    bank: integer,
    value: integer,
    event_transfers: integer,
    event_transfers_cost: integer,
    points_on_bench: integer
  },
  picks: [{
    element: integer @description("Player ID"),
    position: integer @description("Position 1-15 (1-11 starting, 12-15 bench)"),
    multiplier: integer @description("1=normal, 2=captain, 3=triple captain, 0=benched"),
    is_captain: boolean,
    is_vice_captain: boolean
  }]
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
