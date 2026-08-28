---
---

# Element Type (Position)

Player positions in Fantasy Premier League.

```omg.type
type ElementType = {
  id: integer @description("1=GKP, 2=DEF, 3=MID, 4=FWD"),
  plural_name: string @description("Full plural name (e.g., 'Goalkeepers')"),
  plural_name_short: string @description("Short plural name (e.g., 'GKP')"),
  singular_name: string @description("Full singular name (e.g., 'Goalkeeper')"),
  singular_name_short: string @description("Short singular name (e.g., 'GKP')"),
  squad_select: integer @description("Number required in squad"),
  squad_min_select: integer? @description("Minimum number allowed in a squad, or null when there is no separate limit"),
  squad_max_select: integer? @description("Maximum number allowed in a squad, or null when there is no separate limit"),
  squad_min_play: integer @description("Minimum that must play"),
  squad_max_play: integer @description("Maximum that can play"),
  ui_shirt_specific: boolean @description("Whether the UI should use a position-specific shirt image"),
  sub_positions_locked: [integer] @description("Locked substitute positions"),
  element_count: integer @description("Total players of this position")
}
```
