---
---

# Fixture

A match fixture between two Premier League teams.

```omg.type
type FixtureStat = {
  identifier: string,
  a: [{value: integer, element: integer}],
  h: [{value: integer, element: integer}]
}
```

```omg.type
type Fixture = {
  id: integer @description("Unique fixture identifier"),
  code: integer @description("External fixture code"),
  event: integer? @description("Gameweek number (null if unscheduled)"),
  finished: boolean,
  finished_provisional: boolean,
  kickoff_time: string? @format("date-time"),
  minutes: integer @description("Minutes played"),
  provisional_start_time: boolean,
  started: boolean?,
  team_a: integer @description("Away team ID"),
  team_a_score: integer? @description("Away team goals"),
  team_h: integer @description("Home team ID"),
  team_h_score: integer? @description("Home team goals"),
  team_h_difficulty: integer @min(1) @max(5) @description("Home team FDR"),
  team_a_difficulty: integer @min(1) @max(5) @description("Away team FDR"),
  pulse_id: integer,
  stats: [FixtureStat] @description("Match statistics (goals, assists, etc.)")
}
```
