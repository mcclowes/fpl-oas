---
---

# API error

The error shape returned by FPL's Django REST Framework endpoints.

```omg.type
type ApiError = {
  detail: string @description("Human-readable reason the request failed")
}
```
