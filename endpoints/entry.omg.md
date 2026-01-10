---
method: GET
path: /entry/{manager_id}/
operationId: getEntry
tags: [Managers]
---

# Get manager details

Returns detailed information about a specific FPL manager, including their overall statistics and league memberships.

```omg.path
{
  manager_id: integer @description("Manager/entry ID")
}
```

```omg.response
Manager
```

```omg.example
{
  "id": 1234567,
  "joined_time": "2020-07-01T12:00:00Z",
  "started_event": 1,
  "player_first_name": "John",
  "player_last_name": "Smith",
  "player_region_name": "England",
  "summary_overall_points": 1500,
  "summary_overall_rank": 50000,
  "name": "FC John's Team",
  "leagues": {
    "classic": [],
    "h2h": [],
    "cup": {}
  }
}
```
