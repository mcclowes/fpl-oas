---
method: GET
path: /event-status/
operationId: getEventStatus
tags: [Live]
---

# Get event status

Returns the current status of bonus points and league updates for all gameweeks.

```omg.response
{
  status: [{
    bonus_added: boolean @description("Whether bonus points have been added"),
    date: string @description("Date in YYYY-MM-DD format"),
    event: integer @description("Gameweek number"),
    points: "r" | "l" @description("r=ready/finalized, l=live/provisional")
  }],
  leagues: string @description("League update status")
}
```

```omg.example
{
  "status": [
    {
      "bonus_added": true,
      "date": "2025-09-15",
      "event": 4,
      "points": "r"
    }
  ],
  "leagues": "Updated"
}
```
