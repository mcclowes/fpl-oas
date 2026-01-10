---
method: GET
path: /bootstrap-static/
operationId: getBootstrapStatic
tags: [General]
---

# Get bootstrap static data

Returns comprehensive static data for the current FPL season, including all players, teams, gameweeks, game settings, and more. This is the primary endpoint for initial data loading.

This endpoint provides everything needed to render the main FPL interface and should be cached appropriately as it contains a large payload.

```omg.response
{
  events: Event[] @description("All 38 gameweeks"),
  game_settings: {
    league_join_private_max: integer,
    league_join_public_max: integer,
    league_max_size_public_classic: integer,
    league_max_size_public_h2h: integer,
    league_max_size_private_h2h: integer,
    league_max_ko_rounds_private_h2h: integer,
    league_prefix_public: string,
    league_points_h2h_win: integer,
    league_points_h2h_lose: integer,
    league_points_h2h_draw: integer,
    league_ko_first_instead_of_random: boolean,
    cup_start_event_id: integer?,
    cup_stop_event_id: integer?,
    cup_qualifying_method: string?,
    cup_type: string?,
    featured_entries: integer[],
    percentile_ranks: integer[],
    squad_squadplay: integer @description("Starting XI size"),
    squad_squadsize: integer @description("Total squad size"),
    squad_team_limit: integer @description("Max players from one team"),
    squad_total_spend: integer @description("Budget in 0.1m units"),
    ui_currency_multiplier: integer,
    ui_use_special_shirts: boolean,
    stats_form_days: integer,
    sys_vice_captain_enabled: boolean,
    transfers_cap: integer,
    transfers_sell_on_fee: number,
    max_extra_free_transfers: integer,
    timezone: string
  },
  phases: [{
    id: integer,
    name: string @description("Phase name (e.g., 'Overall', 'August')"),
    start_event: integer,
    stop_event: integer,
    highest_score: integer?
  }],
  teams: Team[] @description("All 20 Premier League teams"),
  total_players: integer @description("Total registered FPL managers"),
  elements: Player[] @description("All players (elements)"),
  element_stats: [{
    label: string @description("Display label"),
    name: string @description("API field name")
  }] @description("Available player statistics"),
  element_types: ElementType[] @description("Player positions"),
  chips: Chip[] @description("Available chips")
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
