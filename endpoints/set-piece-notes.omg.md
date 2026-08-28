---
method: GET
path: /team/set-piece-notes/
operationId: getSetPieceNotes
tags: [General]
---

# Get set piece takers

Returns information about set piece responsibilities for each team, including penalty takers, corner takers, and free kick specialists.

```omg.response
{
  teams: [{
    id: integer @description("Team ID"),
    notes: [{
      external_link: boolean @description("Whether source_link points outside the Premier League website"),
      info_message: string @description("Set piece information"),
      source_link: string? @description("Source URL for the note, or null when no source is supplied")
    }] @description("Current set-piece notes published for the team")
  }]
}
```

```omg.example
{
  "teams": [
    {
      "id": 1,
      "notes": [
        {
          "external_link": false,
          "info_message": "Saka takes corners from the right, Martinelli from the left.",
          "source_link": null
        }
      ]
    }
  ]
}
```
