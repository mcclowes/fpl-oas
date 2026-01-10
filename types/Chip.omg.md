---
---

# Chip

A special chip that managers can use to boost their team.

```omg.type
type ChipOverrides = {
  rules: any,
  scoring: any,
  element_types: [any],
  pick_multipliers: [any]
}
```

```omg.type
type Chip = {
  id: integer @description("Unique chip identifier"),
  name: "wildcard" | "freehit" | "bboost" | "3xc" | "manager" @description("Chip type identifier"),
  number: integer @description("Number of this chip type available per season"),
  start_event: integer @description("First gameweek chip can be used"),
  stop_event: integer @description("Last gameweek chip can be used"),
  chip_type: "transfer" | "team" @description("Whether chip affects transfers or team selection"),
  overrides: ChipOverrides @description("Rule overrides when chip is active")
}
```
