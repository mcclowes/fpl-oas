---
id: authentication
title: Authentication
sidebar_position: 2
---

# Authentication

Most of the API is public. You can read every player, team, fixture, gameweek,
manager, and league without credentials, and that covers nearly everything worth
building on.

Three endpoints need a logged-in session:

| Endpoint | What it needs a session for |
| --- | --- |
| [`/me/`](/api/getme) | Your own profile |
| [`/my-team/{manager_id}/`](/api/getmyteam) | Your current squad, including bench order and chips |
| `/entry/{manager_id}/transfers-latest/` | Transfers you have made but not confirmed |

The distinction is between what is public about a manager and what is private to
them. [`/entry/{manager_id}/`](/api/getentry) — anyone's profile, points, and rank — is public.
`/my-team/{manager_id}/` is the same manager's *live, editable* team, and is only
readable as that manager.

## How it works

Authentication is session cookies, set when you log in at
`fantasy.premierleague.com`. There is no API key, no OAuth flow, and no
documented token endpoint. The login form is protected and changes periodically,
which is why no scripted login recipe is given here — anything published would
be wrong within a season.

In practice, integrations that need these endpoints get the cookie out of an
authenticated browser session and send it on the request. That cookie is a
full-access credential for a Premier League account: treat it exactly as you
would a password. Keep it out of source control, out of logs, and out of any
client-side code.

If your integration serves other people, ask yourself whether it needs their
session at all. Almost every FPL tool can be built from the public endpoints, and
the ones that can't are usually asking for a squad the user could paste in
instead.

## Rendering the private endpoints

The reference marks these operations as requiring a session, but the request
builder cannot exercise them — the browser will not attach `fantasy.premierleague.com`
cookies to a request from this origin, and the API sends no CORS headers that
would allow it. Call them from a server, not from a page.

## A note on terms

The Premier League's terms take a dim view of automated access at scale,
particularly anything that pulls data on behalf of many accounts. Using a single
session to read your own team is a different thing from harvesting the userbase,
and the API's lack of enforcement is not permission. See the pacing guidance in
[Using the API](./using-the-api.md).
