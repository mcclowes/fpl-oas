---
id: contributing
title: Editing the spec
sidebar_position: 4
---

# Editing the spec

The OpenAPI document is generated, not hand-written. `static/openapi.yaml` is a
build artifact that happens to be committed — editing it directly will be
overwritten the next time the spec is built.

The sources are [OMG](https://omg.gs) markdown:

```text
api.omg.md            info, servers, security, tag definitions
endpoints/*.omg.md    one file per endpoint
types/*.omg.md        shared schemas: Player, Team, Event, Fixture, Manager, ...
```

## Adding or changing an endpoint

1. Create or edit `endpoints/{endpoint-name}.omg.md`, using a neighbouring file
   as the template.
2. Reference shared schemas from `types/` rather than redefining them inline.
3. Regenerate and check:

   ```sh
   npm run lint        # lint the OMG sources
   npm run build:spec  # regenerate static/openapi.yaml
   npm run lint:spec   # lint the generated OpenAPI document
   npm run dev         # see it at /api
   ```

4. Commit the OMG source *and* the regenerated `static/openapi.yaml` together.

## Conventions

- Path parameters: `{manager_id}`, `{element_id}`, `{event_id}`, `{league_id}`
- Every documented endpoint is a `GET`
- Authenticated endpoints: `/my-team/{manager_id}/` and
  `/entry/{manager_id}/transfers-latest/`; `/me/` accepts optional authentication

## What good coverage looks like

This describes an API nobody publishes a contract for, so the value is in the
detail that isn't guessable from a response body:

- What a field *means*, especially where the name misleads. `element_type` is a
  position; `team` is a team id; `value` is in tenths of a million.
- Units and ranges — tenths, percentages-as-strings, UTC timestamps.
- When a field is null or absent, and what that signifies.
- Whether a value is provisional. Bonus points before confirmation are the
  obvious case.

A schema that only restates the JSON shape is worth much less than one that says
what the numbers are.

## Checks

`npm run lint:spec` runs Speccy's API health rules over the generated document —
nine categories covering conformance, documentation, operations, resource design,
errors, auth, pagination, data modeling, and lifecycle.

Treat its findings as suggestions rather than a gate. Several rules encode
good-API-design advice that this repository cannot act on: we are describing
somebody else's API, and we do not get to add a machine-readable error code to an
endpoint we don't run. Fix what is genuinely a documentation gap; ignore what is
really a complaint about FPL.

`npm run diff:spec` compares the document against `origin/main` and reports
breaking changes. CI runs both on every pull request.
