---
---

# Fixture

A match fixture between two Premier League teams.

```omg.type
type FixtureStat = {
  identifier: string @description("Statistic name, such as goals_scored, assists, or bonus"),
  a: [{value: integer @description("Statistic value"), element: integer @description("Away player ID")}] @description("Away players credited with this statistic"),
  h: [{value: integer @description("Statistic value"), element: integer @description("Home player ID")}] @description("Home players credited with this statistic")
}
```

```omg.type
type Fixture = {
  id: integer @description("Unique fixture identifier"),
  code: integer @description("External fixture code"),
  event: integer? @description("Gameweek number (null if unscheduled)"),
  finished: boolean @description("Whether the fixture is complete and its result is final"),
  finished_provisional: boolean @description("Whether play has ended but the result or statistics may still change"),
  kickoff_time: string? @format("date-time") @description("Scheduled kickoff time, or null when the fixture has not been scheduled"),
  minutes: integer @description("Minutes played"),
  provisional_start_time: boolean @description("Whether the kickoff time is provisional"),
  started: boolean? @description("Whether the fixture has kicked off; may be null before the gameweek is prepared"),
  team_a: integer @description("Away team ID"),
  team_a_score: integer? @description("Away team goals"),
  team_h: integer @description("Home team ID"),
  team_h_score: integer? @description("Home team goals"),
  team_h_difficulty: integer @min(1) @max(5) @description("Home team FDR"),
  team_a_difficulty: integer @min(1) @max(5) @description("Away team FDR"),
  pulse_id: integer @description("Fixture ID in the Premier League's Pulse data service"),
  stats: [FixtureStat] @description("Match statistics (goals, assists, etc.)")
}
```
