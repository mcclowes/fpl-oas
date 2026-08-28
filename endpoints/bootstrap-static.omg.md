---
method: GET
path: /bootstrap-static/
operationId: getBootstrapStatic
tags: [General]
---

# Get bootstrap static data

Returns the current season's main reference data in one large response: every player, club, gameweek, position, chip, scoring phase, and game setting.

Fetch this first when building an FPL client. Join its numeric IDs to other endpoints, and cache the response rather than downloading it before every request. Player prices and gameweek state change regularly, so refresh it when your application needs current data.

```omg.response
{
  events: [Event] @description("All 38 gameweeks"),
  game_settings: {
    league_join_private_max: integer @description("Maximum private leagues one manager can join"),
    league_join_public_max: integer @description("Maximum public leagues one manager can join"),
    league_max_size_public_classic: integer @description("Maximum managers in a public classic league"),
    league_max_size_public_h2h: integer @description("Maximum managers in a public head-to-head league"),
    league_max_size_private_h2h: integer @description("Maximum managers in a private head-to-head league"),
    league_max_ko_rounds_private_h2h: integer @description("Maximum knockout rounds in a private head-to-head league"),
    league_prefix_public: string @description("Name prefix reserved for FPL-created public leagues"),
    league_points_h2h_win: integer @description("League-table points awarded for a head-to-head win"),
    league_points_h2h_lose: integer @description("League-table points awarded for a head-to-head loss"),
    league_points_h2h_draw: integer @description("League-table points awarded for a head-to-head draw"),
    league_ko_first_instead_of_random: boolean @description("Whether knockout seeding uses league position instead of random selection"),
    cup_start_event_id: integer? @description("First cup gameweek, or null when no cup is configured"),
    cup_stop_event_id: integer? @description("Last cup gameweek, or null when no cup is configured"),
    cup_qualifying_method: string? @description("Cup qualification method code, or null when no cup is configured"),
    cup_type: string? @description("Cup format code, or null when no cup is configured"),
    featured_entries: [integer] @description("Manager IDs featured by FPL"),
    percentile_ranks: [integer] @description("Percentile boundaries used to group overall ranks"),
    squad_squadplay: integer @description("Starting XI size"),
    squad_squadsize: integer @description("Total squad size"),
    squad_team_limit: integer @description("Max players from one team"),
    squad_total_spend: integer @description("Budget in 0.1m units"),
    ui_currency_multiplier: integer @description("Multiplier the UI applies when displaying integer money values"),
    ui_use_special_shirts: boolean @description("Whether the UI should use special shirt artwork"),
    stats_form_days: integer @description("Number of recent days used to calculate player form"),
    sys_vice_captain_enabled: boolean @description("Whether vice-captain selection is enabled"),
    transfers_cap: integer @description("Maximum transfers allowed in one gameweek"),
    transfers_sell_on_fee: number @description("Share of price profit retained when a player is sold"),
    max_extra_free_transfers: integer @description("Maximum free transfers that can be rolled over"),
    timezone: string @description("IANA timezone used for game deadlines")
  } @description("Season-wide league, squad, transfer, cup, and UI rules"),
  phases: [{
    id: integer @description("Scoring phase ID"),
    name: string @description("Phase name (e.g., 'Overall', 'August')"),
    start_event: integer @description("First gameweek included in the phase"),
    stop_event: integer @description("Last gameweek included in the phase"),
    highest_score: integer? @description("Highest phase score, or null before the phase has scores")
  }] @description("Season and monthly scoring periods used by phase leagues"),
  teams: [Team] @description("All 20 Premier League teams"),
  total_players: integer @description("Total registered FPL managers"),
  elements: [Player] @description("All players (elements)"),
  element_stats: [{
    label: string @description("Display label"),
    name: string @description("API field name")
  }] @description("Available player statistics"),
  element_types: [ElementType] @description("Player positions"),
  chips: [Chip] @description("Available chips")
}
```

```omg.example
{
  "events": [
    {
      "id": 1,
      "name": "Gameweek 1",
      "deadline_time": "2025-08-15T17:30:00Z",
      "average_entry_score": 54,
      "finished": true,
      "is_current": false
    }
  ],
  "teams": [
    {
      "id": 1,
      "name": "Arsenal",
      "short_name": "ARS",
      "strength": 5
    }
  ],
  "total_players": 12802828
}
```
