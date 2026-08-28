---
---

# Event (Gameweek)

A gameweek in the FPL season. The API refers to gameweeks as "events".

```omg.type
type ChipPlay = {
  chip_name: string @description("Chip identifier"),
  num_played: integer @description("Number of managers who played the chip in this gameweek")
}
```

```omg.type
type TopElementInfo = {
  id: integer @description("Top-scoring player ID"),
  points: integer @description("Points scored by the player in this gameweek")
}
```

```omg.type
type Event = {
  id: integer @description("Gameweek number"),
  name: string @description("Display name (e.g., 'Gameweek 1')"),
  deadline_time: string @format("date-time") @description("ISO 8601 deadline timestamp"),
  deadline_time_epoch: integer @description("Unix timestamp of deadline"),
  deadline_time_game_offset: integer @description("Internal offset between the gameweek deadline and the first fixture"),
  release_time: string? @format("date-time") @description("Time the gameweek became available, or null if it has not been released"),
  average_entry_score: integer @description("Average points scored by all managers"),
  finished: boolean @description("Whether gameweek has finished"),
  data_checked: boolean @description("Whether data has been verified"),
  highest_scoring_entry: integer? @description("Manager ID with highest score"),
  highest_score: integer? @description("Highest score achieved"),
  is_previous: boolean @description("Whether this is the most recently completed gameweek"),
  is_current: boolean @description("Whether this is the current gameweek"),
  is_next: boolean @description("Whether this is the next scheduled gameweek"),
  cup_leagues_created: boolean @description("Whether cup leagues have been created for this gameweek"),
  h2h_ko_matches_created: boolean @description("Whether head-to-head knockout matches have been created"),
  can_enter: boolean @description("Whether new entries are allowed"),
  can_manage: boolean @description("Whether team changes are allowed"),
  released: boolean @description("Whether the gameweek is visible and available in the game"),
  ranked_count: integer @description("Number of ranked managers"),
  chip_plays: [ChipPlay] @description("Chips used this gameweek"),
  most_selected: integer? @description("Most selected player ID"),
  most_transferred_in: integer? @description("Most transferred in player ID"),
  most_captained: integer? @description("Most captained player ID"),
  most_vice_captained: integer? @description("Most vice-captained player ID"),
  top_element: integer? @description("Top scoring player ID"),
  top_element_info: TopElementInfo? @description("Top scorer details"),
  transfers_made: integer @description("Total transfers made")
}
```
