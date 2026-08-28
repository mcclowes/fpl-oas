---
method: GET
path: /me/
operationId: getMe
tags: [Managers]
security:
  - session: []
---

# Get authenticated user

Returns the account profile and manager ID associated with the current FPL session. Use `player.entry` to call manager-specific endpoints.

**Requires authentication via FPL session cookie.**

```omg.response
{
  player: {
    date_of_birth: string? @format("date") @description("Account holder's date of birth, or null when unavailable"),
    dirty: boolean @description("Whether the account profile has pending or incomplete changes"),
    first_name: string @description("Account holder's first name"),
    gender: string? @description("Account holder's gender value, or null when not provided"),
    id: integer @description("User ID"),
    last_name: string @description("Account holder's last name"),
    region: integer @description("Profile region ID"),
    email: string @format("email") @description("Account email address"),
    entry: integer @description("Manager/entry ID"),
    entry_email: boolean @description("Whether the account receives FPL entry emails")
  } @description("User account linked to the authenticated session")
}
```

```omg.response.401
{
  detail: string @description("Authentication required")
}
```

```omg.example
{
  "player": {
    "first_name": "John",
    "last_name": "Smith",
    "id": 9876543,
    "region": 80,
    "email": "john@example.com",
    "entry": 1234567
  }
}
```
