---
method: GET
path: /stats/best-classic-private-leagues/
operationId: getBestClassicPrivateLeagues
tags: [Stats]
---

# Get best classic private leagues

Returns the highest-scoring private classic leagues, ranked by average score.

```omg.response
[{
  league: integer @description("Classic league ID"),
  entries: integer @description("Number of managers in the league"),
  average_score: string @description("League average score, formatted to one decimal place"),
  name: string @description("League name")
}]
```

```omg.example
[
  {
    "league": 28071,
    "entries": 105672,
    "average_score": "115.4",
    "name": "Example league"
  }
]
```
