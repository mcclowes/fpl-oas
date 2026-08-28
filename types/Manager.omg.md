---
---

# Manager (Entry)

A Fantasy Premier League manager/team owner.

```omg.type
type ManagerLeague = {
  id: integer @description("League ID"),
  name: string @description("League name"),
  short_name: string? @description("Abbreviated league name, or null when none is set"),
  created: string @format("date-time") @description("Time the league was created"),
  closed: boolean @description("Whether new managers can no longer join"),
  rank: integer? @description("League rank among leagues of the same type, or null when not ranked"),
  max_entries: integer? @description("Maximum number of managers, or null when unlimited"),
  league_type: string @description("FPL league type code"),
  scoring: string @description("Scoring format code, such as c for classic or h for head-to-head"),
  admin_entry: integer? @description("Manager ID of the league administrator, or null when FPL administers the league"),
  start_event: integer @description("First gameweek counted by the league"),
  entry_can_leave: boolean @description("Whether this manager can leave the league"),
  entry_can_admin: boolean @description("Whether this manager can administer the league"),
  entry_can_invite: boolean @description("Whether this manager can invite other managers"),
  has_cup: boolean @description("Whether the league includes a cup competition"),
  cup_league: integer? @description("Associated cup league ID, or null when there is no cup"),
  cup_qualified: boolean? @description("Whether this manager qualified for the cup, or null before qualification"),
  entry_rank: integer @description("Manager's current rank in the league"),
  entry_last_rank: integer @description("Manager's rank at the previous update")
}
```

```omg.type
type ManagerCupStatus = {
  qualification_event: integer? @description("Gameweek used for cup qualification, or null before it is scheduled"),
  qualification_numbers: integer? @description("Number of managers who qualify, or null before qualification is configured"),
  qualification_rank: integer? @description("Manager's qualification rank, or null before qualification is calculated"),
  qualification_state: string? @description("Cup qualification state, or null when the league has no active cup")
}
```

```omg.type
type Manager = {
  id: integer @description("Unique manager/entry ID"),
  joined_time: string @format("date-time") @description("Time the manager registered for FPL"),
  started_event: integer @description("First gameweek played"),
  favourite_team: integer? @description("Supported team ID"),
  player_first_name: string @description("Manager's first name"),
  player_last_name: string @description("Manager's last name"),
  player_region_id: integer @description("Manager's region ID"),
  player_region_name: string @description("Manager's region name"),
  player_region_iso_code_short: string @description("Manager region's ISO 3166-1 alpha-2 code"),
  player_region_iso_code_long: string @description("Manager region's ISO 3166-1 alpha-3 code"),
  summary_overall_points: integer @description("Total points this season"),
  summary_overall_rank: integer @description("Overall rank"),
  summary_event_points: integer @description("Points in current gameweek"),
  summary_event_rank: integer? @description("Rank in current gameweek"),
  current_event: integer @description("Current gameweek"),
  name: string @description("Team name"),
  name_change_blocked: boolean @description("Whether the manager is currently prevented from changing the team name"),
  kit: string? @description("Team kit code"),
  last_deadline_bank: integer @description("Bank balance at last deadline"),
  last_deadline_value: integer @description("Squad value at last deadline"),
  last_deadline_total_transfers: integer @description("Season transfer count at the most recent gameweek deadline"),
  leagues: {
    classic: [ManagerLeague] @description("Classic-scoring leagues the manager belongs to"),
    h2h: [ManagerLeague] @description("Head-to-head leagues the manager belongs to"),
    cup: ManagerCupStatus @description("Overall FPL cup qualification details"),
    cup_matches: [any] @description("FPL cup matches; entries have an undocumented shape")
  } @description("League memberships and cup participation")
}
```
