---
---

# Team

A Premier League team/club.

```omg.type
type Team = {
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
  team_division: integer? @description("Internal division identifier, or null when the team has no division"),
  unavailable: boolean @description("Whether team data is unavailable"),
  strength_overall_home: integer @description("Overall strength rating at home"),
  strength_overall_away: integer @description("Overall strength rating away"),
  strength_attack_home: integer @description("Attacking strength rating at home"),
  strength_attack_away: integer @description("Attacking strength rating away"),
  strength_defence_home: integer @description("Defensive strength rating at home"),
  strength_defence_away: integer @description("Defensive strength rating away"),
  pulse_id: integer @description("External Pulse Sports ID")
}
```
