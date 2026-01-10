# FPL API changelog

Observed changes to the Fantasy Premier League API. Since this is an unofficial API, changes are documented as they're discovered.

## 2024-25 season

### Pre-season (July 2024)
- Season data reset
- New player IDs assigned for new signings
- `elements` array in bootstrap-static updated with new players

### Known changes from 2023-24
- `expected_goals`, `expected_assists`, `expected_goal_involvements` added to player stats
- `starts` field added to track player starting appearances
- Bonus points system remains unchanged (BPS-based)

## 2023-24 season

### Mid-season observations
- `chance_of_playing_this_round` and `chance_of_playing_next_round` values: 0, 25, 50, 75, 100, or null
- `news_added` timestamp format: ISO 8601
- Transfer deadline enforcement reflected in `transfers` endpoints

### API stability
- Core endpoints (`/bootstrap-static/`, `/fixtures/`) remain stable
- No authentication changes observed
- Rate limiting behavior unchanged (no official limits published)

## Historical notes

### Endpoint deprecations
- None observed in recent seasons

### Known quirks
- `/bootstrap-static/` can be slow (large payload ~2MB)
- Live data (`/event/{id}/live/`) updates every few minutes during matches
- Some manager endpoints return 404 for deleted/banned accounts
- Cup endpoints only available during cup rounds

## Contributing

If you observe API changes, please open an issue or PR with:
- Date of observation
- Endpoint affected
- Before/after behavior
- Example response if possible
