# 3-D Secure service

Prepare (mandatory) a 3-D Secure token for use elsewhere in the API.

## Interface

The pares must be provided as base64 string

**Endpoint:**

```shell
POST /pares
```

```javascript
{
    pares: String,
}
→ {
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
- [TDSECURE_PARES_INVALID](./status-codes.md#3tsecure_pares_invalid)
