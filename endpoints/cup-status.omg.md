---
method: GET
path: /league/{league_id}/cup-status/
operationId: getCupStatus
tags: [Leagues]
---

# Get league cup status

Returns the cup competition status for a specific league.

```omg.path
{
  league_id: integer @description("League ID")
}
```

```omg.response
{
  qualification_event: integer? @description("Gameweek cup qualification occurred"),
  qualification_numbers: integer? @description("Number of qualifiers"),
  qualification_rank: integer? @description("Rank required to qualify"),
  qualification_state: string? @description("Current qualification state")
}
```
