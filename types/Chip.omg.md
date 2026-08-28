---
---

# Chip

A special chip that managers can use to boost their team.

```omg.type
type ChipOverrides = {
  rules: any @description("Rule changes applied while the chip is active; shape varies by chip"),
  scoring: any @description("Scoring changes applied by the chip; shape varies by chip"),
  element_types: [any] @description("Position-rule overrides; entries have an undocumented, chip-specific shape"),
  pick_multipliers: [any] @description("Squad-position multiplier overrides; entries have an undocumented, chip-specific shape")
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
