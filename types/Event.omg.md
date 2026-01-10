---
---

# Event (Gameweek)

A gameweek in the FPL season. The API refers to gameweeks as "events".

```omg.type
type ChipPlay = {
  chip_name: string,
  num_played: integer
}
```

```omg.type
type TopElementInfo = {
  id: integer,
  points: integer
}
```

```omg.type
type Event = {
  id: integer @description("Gameweek number"),
  name: string @description("Display name (e.g., 'Gameweek 1')"),
  deadline_time: string @format("date-time") @description("ISO 8601 deadline timestamp"),
  deadline_time_epoch: integer @description("Unix timestamp of deadline"),
  deadline_time_game_offset: integer,
  release_time: string?,
  average_entry_score: integer @description("Average points scored by all managers"),
  finished: boolean @description("Whether gameweek has finished"),
  data_checked: boolean @description("Whether data has been verified"),
  highest_scoring_entry: integer? @description("Manager ID with highest score"),
  highest_score: integer? @description("Highest score achieved"),
  is_previous: boolean,
  is_current: boolean,
  is_next: boolean,
  cup_leagues_created: boolean,
  h2h_ko_matches_created: boolean,
  can_enter: boolean @description("Whether new entries are allowed"),
  can_manage: boolean @description("Whether team changes are allowed"),
  released: boolean,
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
