---
method: GET
path: /event/{event_id}/live/
operationId: getEventLive
tags: [Live]
---

# Get live gameweek data

Returns live points and statistics for all players in a specific gameweek. This endpoint updates throughout matches.

```omg.path
{
  event_id: integer @description("Gameweek number (1-38)")
}
```

```omg.response
{
  elements: [{
    id: integer @description("Player ID"),
    stats: {
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
      total_points: integer,
      in_dreamteam: boolean
    },
    explain: [{
      fixture: integer,
      stats: [{
        identifier: string,
        points: integer,
        value: integer
      }]
    }] @description("Points breakdown by fixture and stat")
  }]
}
```
