---
method: GET
path: /dream-team/{event_id}/
operationId: getDreamTeam
tags: [Stats]
---

# Get dream team

Returns the highest-scoring players (dream team) for a specific gameweek.

```omg.path
{
  event_id: integer @description("Gameweek number (1-38)")
}
```

```omg.response
{
  top_player: {
    id: integer @description("Highest scorer's player ID"),
    points: integer @description("Points scored")
  },
  team: [{
    element: integer @description("Player ID"),
    points: integer @description("Points scored in gameweek"),
    position: integer @description("Position in dream team (1-11)")
  }]
}
```

```omg.example
{
  "top_player": {
    "id": 351,
    "points": 21
  },
  "team": [
    {"element": 1, "points": 12, "position": 1},
    {"element": 45, "points": 15, "position": 2},
    {"element": 351, "points": 21, "position": 8}
  ]
}
```
