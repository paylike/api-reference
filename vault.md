# Vault

This service exposes a HTTP interface for specific types of data which are saved using the vault service.

## Interface

**Save a value to the vault.**

The type of value must be specified using the `type` parameter. Supported types:

| Type   | Value                                        |
| ------ | -------------------------------------------- |
| `pcn`  | Payment card number (10-19 digits string)    |
| `pcsc` | Payment card security code (3 digits string) |

**Endpoint:**

```javascript

POST /

```

```javascript
{
  type: String,
  value: String,
} → {
  token: String,
}
```

**Request** with a body must carry a header of:

- `Content-Type: application/json`
- `Accept-Version: 1`

### Status codes

- [INTERNAL_ERROR](./status-codes.md#internal_error)
- [ENDPOINT_NOT_FOUND](./status-codes.md#endpoint_not_found)
- [VERSION_MISSING](./status-codes.md#version_missing)
- [VERSION_UNSUPPORTED](./status-codes.md#version_unsupported)
- [BODY_INVALID](./status-codes.md#body_invalid)
- [VAULT_VALUE_TYPE_INVALID](./status-codes.md#vault_value_type_invalid)
- [VAULT_VALUE_PCN_INVALID](./status-codes.md#vault_value_pcn_invalid)
- [VAULT_VALUE_PCSC_INVALID](./status-codes.md#vault_value_pcsc_invalid)
