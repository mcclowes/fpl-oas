---
method: GET
path: /entry/{manager_id}/transfers/
operationId: getEntryTransfers
tags: [Managers]
---

# Get manager transfers

Returns all transfers made by a manager in the current season.

```omg.path
{
  manager_id: integer @description("Manager/entry ID")
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
