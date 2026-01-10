---
method: GET
path: /fixtures/
operationId: getFixtures
tags: [Fixtures]
---

# Get all fixtures

Returns all fixtures for the current season. Past fixtures include scores and detailed statistics, while future fixtures contain scheduling information.

```omg.query
{
  event: integer? @description("Filter by gameweek number"),
  future: integer? @description("Set to 1 to only return future fixtures")
}
```

```omg.response
Fixture[]
```

```omg.example
[
  {
    "id": 1,
    "event": 1,
    "team_h": 1,
    "team_a": 10,
    "team_h_score": 2,
    "team_a_score": 0,
    "kickoff_time": "2025-08-16T11:30:00Z",
    "finished": true,
    "stats": [
      {
        "identifier": "goals_scored",
        "h": [{"value": 1, "element": 351}],
        "a": []
      }
    ]
  }
]
```
