# Google Pay

Prepare (mandatory) a Google Pay token for use elsewhere in the API.

```shell
POST https://googlepay.paylike.io/token
```

```javascript
{
    token: String,
}
// → Token
```

## Status codes

- [INTERNAL_ERROR](./status-codes.md#internal_error)
- [VERSION_MISSING](./status-codes.md#version_missing)
- [VERSION_UNSUPPORTED](./status-codes.md#version_unsupported)
- [BODY_INVALID](./status-codes.md#body_invalid)
- [REQUEST_INVALID](./status-codes.md#body_invalid)
- [GOOGLEPAY_TOKEN_INVALID](#googlepay_token_invalid)
- [GOOGLEPAY_CONFIGURATION_INVALID](#googlepay_configuration_invalid)
- [GOOGLEPAY_DECODING_ERROR](#googlepay_decoding_error)
