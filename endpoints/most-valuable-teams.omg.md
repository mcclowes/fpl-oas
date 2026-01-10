---
method: GET
path: /stats/most-valuable-teams/
operationId: getMostValuableTeams
tags: [Stats]
---

# Get most valuable teams

Returns the top 5 most valuable FPL squads by total team value.

```omg.response
[{
  id: integer @description("Manager/entry ID"),
  name: string @description("Team name"),
  manager: string @description("Manager name"),
  value: integer @description("Total squad value in 0.1m units")
}]
```

```omg.example
[
  {
    "id": 1234567,
    "name": "Expensive FC",
    "manager": "Rich Manager",
    "value": 1150
  }
]
```
