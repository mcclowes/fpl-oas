---
method: GET
path: /regions/
operationId: getRegions
tags: [General]
---

# Get regions

Returns the countries and regions used for manager profiles and regional leagues.

```omg.response
[{
  id: integer @description("Region ID used by manager profiles"),
  name: string @description("Display name"),
  code: integer @description("Numeric region code"),
  iso_code_short: string @description("ISO 3166-1 alpha-2 code"),
  iso_code_long: string @description("ISO 3166-1 alpha-3 code")
}]
```

```omg.example
[
  {
    "id": 1,
    "name": "Afghanistan",
    "code": 1,
    "iso_code_short": "AF",
    "iso_code_long": "AFG"
  }
]
```
