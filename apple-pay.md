# Apple Pay service

Prepare (mandatory) an Apple Pay token for use elsewhere in the API.

The token must be provided as JSON string

```shell
POST https://applepay.paylike.io/token
```

```javascript
{
    token: String,
}
// → @paylike/token/generic
```

[@paylike/token/generic](https://github.com/paylike/schemas/blob/master/schemas.md#payliketokengeneric)

**Request** with a body must carry a header of:

- `Content-Type: application/json`
- `Accept-Version: 1`

## Status codes

- [INTERNAL_ERROR](./status-codes.md#internal_error)
- [ENDPOINT_NOT_FOUND](./status-codes.md#endpoint_not_found)
- [VERSION_MISSING](./status-codes.md#version_missing)
- [VERSION_UNSUPPORTED](./status-codes.md#version_unsupported)
- [BODY_INVALID](./status-codes.md#body_invalid)
- [REQUEST_INVALID](./status-codes.md#body_invalid)
- [APPLEPAY_TOKEN_INVALID](./status-codes.md#applepay_token_invalid)
- [APPLEPAY_CONFIGURATION_INVALID](./status-codes.md#applepay_configuration_invalid)
- [APPLEPAY_VALIDATION_URL_INVALID](./status-codes.md#applepay_validation_url_invalid)
