# Vault service

Tokenize sensitive details for use elsewhere in the API.

```shell
POST https://vault.paylike.io
```

```javascript
{
  type: String,
  value: String,
}
// → @paylike/token/generic
```

[@paylike/token/generic](https://github.com/paylike/schemas/blob/master/schemas.md#payliketokengeneric)

The type of value must be specified using the `type` parameter:

| Type   | Value                                        |
| ------ | -------------------------------------------- |
| `pcn`  | Payment card number (10-19 digits string)    |
| `pcsc` | Payment card security code (3 digits string) |

## Status codes

- [INTERNAL_ERROR](./status-codes.md#internal_error)
- [ENDPOINT_NOT_FOUND](./status-codes.md#endpoint_not_found)
- [VERSION_MISSING](./status-codes.md#version_missing)
- [VERSION_UNSUPPORTED](./status-codes.md#version_unsupported)
- [BODY_INVALID](./status-codes.md#body_invalid)
- [REQUEST_INVALID](./status-codes.md#body_invalid)
