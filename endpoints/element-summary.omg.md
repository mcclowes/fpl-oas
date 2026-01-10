---
method: GET
path: /element-summary/{element_id}/
operationId: getElementSummary
tags: [Players]
---

# Get player summary

Returns detailed information about a specific player, including their fixture history, upcoming fixtures, and previous season statistics.

```omg.path
{
  element_id: integer @description("Player ID")
}
```

```omg.response
{
  fixtures: [{
    id: integer,
    code: integer,
    team_h: integer,
    team_h_score: integer?,
    team_a: integer,
    team_a_score: integer?,
    event: integer?,
    finished: boolean,
    minutes: integer,
    provisional_start_time: boolean,
    kickoff_time: string?,
    event_name: string?,
    is_home: boolean,
    difficulty: integer @min(1) @max(5)
  }] @description("Upcoming fixtures for this player"),
  history: [{
    element: integer,
    fixture: integer,
    opponent_team: integer,
    total_points: integer,
    was_home: boolean,
    kickoff_time: string,
    team_h_score: integer,
    team_a_score: integer,
    round: integer,
    minutes: integer,
    goals_scored: integer,
    assists: integer,
    clean_sheets: integer,
    goals_conceded: integer,
    own_goals: integer,
    penalties_saved: integer,
    penalties_missed: integer,
    yellow_cards: integer,
    red_cards: integer,
    saves: integer,
    bonus: integer,
    bps: integer,
    influence: string,
    creativity: string,
    threat: string,
    ict_index: string,
    starts: integer,
    expected_goals: string,
    expected_assists: string,
    expected_goal_involvements: string,
    expected_goals_conceded: string,
    value: integer,
    transfers_balance: integer,
    selected: integer,
    transfers_in: integer,
    transfers_out: integer
  }] @description("Performance history this season"),
  history_past: [{
    season_name: string @description("Season identifier (e.g., '2023/24')"),
    element_code: integer,
    start_cost: integer,
    end_cost: integer,
    total_points: integer,
    minutes: integer,
    goals_scored: integer,
    assists: integer,
    clean_sheets: integer,
    goals_conceded: integer,
    own_goals: integer,
    penalties_saved: integer,
    penalties_missed: integer,
    yellow_cards: integer,
    red_cards: integer,
    saves: integer,
    bonus: integer,
    bps: integer,
    influence: string,
    creativity: string,
    threat: string,
    ict_index: string,
    starts: integer,
    expected_goals: string,
    expected_assists: string,
    expected_goal_involvements: string,
    expected_goals_conceded: string
  }] @description("Previous seasons statistics")
}
```
