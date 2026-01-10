---
method: GET
path: /me/
operationId: getMe
tags: [Managers]
security:
  - session: []
---

# Get authenticated user

Returns profile information for the currently authenticated user.

**Requires authentication via FPL session cookie.**

```omg.response
{
  player: {
    date_of_birth: string?,
    dirty: boolean,
    first_name: string,
    gender: string?,
    id: integer @description("User ID"),
    last_name: string,
    region: integer,
    email: string,
    entry: integer @description("Manager/entry ID"),
    entry_email: boolean
  }
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
