# 3-D Secure

You will not need this API if you are using our
[payment popup](https://github.com/paylike/sdk) or the
[payments API](payments/index.md).

Prepare (mandatory) a 3-D Secure token for use elsewhere in the API.

```shell
POST https://3dsecure.paylike.io/pares
```

```javascript
{
    pares: String, // base64
}
// → Token
```

## Status codes

- [INTERNAL_ERROR](./status-codes.md#internal_error)
- [VERSION_MISSING](./status-codes.md#version_missing)
- [VERSION_UNSUPPORTED](./status-codes.md#version_unsupported)
- [BODY_INVALID](./status-codes.md#body_invalid)
- [REQUEST_INVALID](./status-codes.md#body_invalid)
- [TDSECURE_PARES_INVALID](./status-codes.md#3tsecure_pares_invalid)
