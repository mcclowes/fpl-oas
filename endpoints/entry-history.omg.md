---
method: GET
path: /entry/{manager_id}/history/
operationId: getEntryHistory
tags: [Managers]
---

# Get manager history

Returns a manager's historical performance data including gameweek scores, chip usage, and previous season rankings.

```omg.path
{
  manager_id: integer @description("Manager/entry ID")
}
```

```omg.response
{
  current: [{
    event: integer @description("Gameweek number"),
    points: integer @description("Points scored"),
    total_points: integer @description("Cumulative points"),
    rank: integer @description("Gameweek rank"),
    rank_sort: integer,
    overall_rank: integer @description("Overall rank after this gameweek"),
    percentile_rank: integer?,
    bank: integer @description("Remaining budget in 0.1m units"),
    value: integer @description("Squad value in 0.1m units"),
    event_transfers: integer @description("Transfers made"),
    event_transfers_cost: integer @description("Transfer cost (points)"),
    points_on_bench: integer @description("Points left on bench")
  }] @description("This season's gameweek history"),
  past: [{
    season_name: string @description("Season identifier (e.g., '2023/24')"),
    total_points: integer,
    rank: integer
  }] @description("Previous seasons rankings"),
  chips: [{
    name: string @description("Chip name"),
    time: string @format("date-time") @description("When chip was activated"),
    event: integer @description("Gameweek chip was used")
  }] @description("Chips used this season")
}
```
