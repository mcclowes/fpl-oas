---
method: GET
path: /entry/{manager_id}/transfers-latest/
operationId: getEntryTransfersLatest
tags: [Managers]
security:
  - session: []
---

# Get latest manager transfers

Returns transfers made by the authenticated manager in the current gameweek.

**Requires authentication via FPL session cookie. The manager ID must belong to the authenticated user.**

```omg.path
{
  manager_id: integer @description("Manager/entry ID belonging to the authenticated user")
}
```

```omg.response
[{
  element_in: integer @description("Player bought ID"),
  element_in_cost: integer @description("Purchase price in 0.1m units"),
  element_out: integer @description("Player sold ID"),
  element_out_cost: integer @description("Sale price in 0.1m units"),
  entry: integer @description("Manager ID"),
  event: integer @description("Gameweek number"),
  time: string @format("date-time") @description("Transfer timestamp")
}]
```

```omg.response.401
{
  detail: string @description("Authentication required")
}
```

```omg.example
[
  {
    "element_in": 351,
    "element_in_cost": 115,
    "element_out": 233,
    "element_out_cost": 65,
    "entry": 1234567,
    "event": 5,
    "time": "2025-09-10T12:30:00Z"
  }
]
```
