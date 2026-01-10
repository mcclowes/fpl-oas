---
---

# Manager (Entry)

A Fantasy Premier League manager/team owner.

```omg.type
type ManagerLeague = {
  id: integer,
  name: string,
  short_name: string?,
  created: string,
  closed: boolean,
  rank: integer?,
  max_entries: integer?,
  league_type: string,
  scoring: string,
  admin_entry: integer?,
  start_event: integer,
  entry_can_leave: boolean,
  entry_can_admin: boolean,
  entry_can_invite: boolean,
  has_cup: boolean,
  cup_league: integer?,
  cup_qualified: boolean?,
  entry_rank: integer,
  entry_last_rank: integer
}
```

```omg.type
type ManagerCupStatus = {
  qualification_event: integer?,
  qualification_numbers: integer?,
  qualification_rank: integer?,
  qualification_state: string?
}
```

```omg.type
type Manager = {
  id: integer @description("Unique manager/entry ID"),
  joined_time: string @format("date-time"),
  started_event: integer @description("First gameweek played"),
  favourite_team: integer? @description("Supported team ID"),
  player_first_name: string,
  player_last_name: string,
  player_region_id: integer,
  player_region_name: string,
  player_region_iso_code_short: string,
  player_region_iso_code_long: string,
  summary_overall_points: integer @description("Total points this season"),
  summary_overall_rank: integer @description("Overall rank"),
  summary_event_points: integer @description("Points in current gameweek"),
  summary_event_rank: integer? @description("Rank in current gameweek"),
  current_event: integer @description("Current gameweek"),
  name: string @description("Team name"),
  name_change_blocked: boolean,
  kit: string? @description("Team kit code"),
  last_deadline_bank: integer @description("Bank balance at last deadline"),
  last_deadline_value: integer @description("Squad value at last deadline"),
  last_deadline_total_transfers: integer,
  leagues: {
    classic: [ManagerLeague],
    h2h: [ManagerLeague],
    cup: ManagerCupStatus,
    cup_matches: [any]
  }
}
```
