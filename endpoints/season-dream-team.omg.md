---
method: GET
path: /dream-team/
operationId: getSeasonDreamTeam
tags: [Stats]
---

# Get season dream team

Returns the highest-scoring valid team across the season to date.

```omg.response
{
  top_player: {
    id: integer @description("Highest scorer's player ID"),
    points: integer @description("Total points scored this season")
  },
  team: [{
    element: integer @description("Player ID"),
    points: integer @description("Total points scored this season"),
    position: integer @description("Position in dream team (1-11)")
  }]
}
```

```omg.example
{
  "top_player": {
    "id": 115,
    "points": 17
  },
  "team": [
    {"element": 572, "points": 10, "position": 1},
    {"element": 115, "points": 17, "position": 2}
  ]
}
```
