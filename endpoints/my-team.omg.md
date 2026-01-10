---
method: GET
path: /my-team/{manager_id}/
operationId: getMyTeam
tags: [Managers]
security:
  - session: []
---

# Get my team

Returns the authenticated manager's current team, including players, chips available, and recent transfers.

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
    multiplier: integer,
    purchase_price: integer @description("Purchase price in 0.1m units"),
    is_captain: boolean,
    is_vice_captain: boolean
  }],
  chips: [{
    status_for_entry: "available" | "played" | "unavailable",
    played_by_entry: integer[],
    name: string,
    number: integer,
    start_event: integer,
    stop_event: integer,
    chip_type: string
  }],
  transfers: {
    cost: integer @description("Transfer cost in points"),
    status: "cost" | "free",
    limit: integer?,
    made: integer @description("Transfers made this gameweek"),
    bank: integer @description("Remaining budget"),
    value: integer @description("Squad value")
  }
}
```

```omg.response.401
{
  detail: string @description("Authentication required")
}
```
