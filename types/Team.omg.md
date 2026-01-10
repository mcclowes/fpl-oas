---
$id: Team
---

# Team

A Premier League team/club.

```omg.type
Team: {
  id: integer @description("Unique team identifier"),
  code: integer @description("Internal team code"),
  name: string @description("Full team name"),
  short_name: string @minLength(3) @maxLength(3) @description("3-letter abbreviation"),
  strength: integer @min(1) @max(5) @description("Overall team strength rating"),
  position: integer @description("Current league position"),
  played: integer @description("Matches played"),
  win: integer @description("Matches won"),
  draw: integer @description("Matches drawn"),
  loss: integer @description("Matches lost"),
  points: integer @description("League points"),
  form: string? @description("Recent form string"),
  team_division: integer?,
  unavailable: boolean @description("Whether team data is unavailable"),
  strength_overall_home: integer,
  strength_overall_away: integer,
  strength_attack_home: integer,
  strength_attack_away: integer,
  strength_defence_home: integer,
  strength_defence_away: integer,
  pulse_id: integer @description("External Pulse Sports ID")
}
```
