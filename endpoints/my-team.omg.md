---
method: GET
path: /my-team/{manager_id}/
operationId: getMyTeam
tags: [Managers]
security:
  - session: []
---

# Get my team

Returns the authenticated manager's editable 15-player squad, chip availability, and transfer budget for the current gameweek. Unlike the public picks endpoint, prices are specific to this manager and reflect purchase and sale values.

**Requires authentication via FPL session cookie.**

```omg.path
{
  manager_id: integer @description("Manager/entry ID")
}
```

```omg.response
{
  picks: [{
    element: integer @description("Player ID"),
    position: integer @description("Squad position (1-15)"),
    selling_price: integer @description("Sale price in 0.1m units"),
    multiplier: integer @description("Points multiplier: 2 for captain, 3 for triple captain, 1 otherwise"),
    purchase_price: integer @description("Purchase price in 0.1m units"),
    is_captain: boolean @description("Whether the player is the current captain"),
    is_vice_captain: boolean @description("Whether the player is the current vice-captain")
  }],
  chips: [{
    status_for_entry: "available" | "played" | "unavailable" @description("Whether this manager can still play the chip"),
    played_by_entry: [integer] @description("Gameweeks in which this manager played the chip"),
    name: string @description("Chip identifier"),
    number: integer @description("Chip instance number when a chip can be offered more than once"),
    start_event: integer @description("First gameweek in which the chip can be played"),
    stop_event: integer @description("Last gameweek in which the chip can be played"),
    chip_type: string @description("Whether the chip changes transfers or team scoring")
  }],
  transfers: {
    cost: integer @description("Transfer cost in points"),
    status: "cost" | "free" @description("Whether the next transfer costs points or is free"),
    limit: integer? @description("Free-transfer allowance, or null when transfers are unlimited"),
    made: integer @description("Transfers made this gameweek"),
    bank: integer @description("Unspent budget in 0.1m units"),
    value: integer @description("Current squad value in 0.1m units")
  }
}
```

```omg.response.401
{
  detail: string @description("Authentication required")
}
```
