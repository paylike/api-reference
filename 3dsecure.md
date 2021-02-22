# 3-D Secure

Prepare (mandatory) a 3-D Secure token for use elsewhere in the API.

```shell
POST https://3dsecure.paylike.io/pares
```

```javascript
{
    pares: String, // base64
}
// → @paylike/token/generic
```

- [@paylike/token/generic](https://github.com/paylike/schemas/blob/master/schemas.md#payliketokengeneric)

## Status codes

- [INTERNAL_ERROR](./status-codes.md#internal_error)
- [ENDPOINT_NOT_FOUND](./status-codes.md#endpoint_not_found)
- [VERSION_MISSING](./status-codes.md#version_missing)
- [VERSION_UNSUPPORTED](./status-codes.md#version_unsupported)
- [BODY_INVALID](./status-codes.md#body_invalid)
- [REQUEST_INVALID](./status-codes.md#body_invalid)
- [TDSECURE_PARES_INVALID](./status-codes.md#3tsecure_pares_invalid)
