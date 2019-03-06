# Apple Pay Service

Prepare (mandatory) an Apple Pay token for use elsewhere in the API.

## Interface

The token must be provided as JSON string

**Endpoint:**

```shell
POST /token
```

```javascript
{
    token: String,
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
- [APPLEPAY_TOKEN_INVALID](./status-codes.md#applepay_token_invalid)
- [APPLEPAY_TOKEN_VERSION_UNSUPPORTED](./status-codes.md#applepay_token_version_unsupported)
- [APPLEPAY_TOKEN_DATA_INVALID](./status-codes.md#applepay_token_data_invalid)
- [APPLEPAY_TOKEN_SIGNATURE_INVALID](./status-codes.md#applepay_token_signature_invalid)
- [APPLEPAY_TOKEN_KEYPAIR_UNKNOWN](./status-codes.md#applepay_token_keypair_unknown)
- [APPLEPAY_TOKEN_HEADER_INVALID](./status-codes.md#applepay_token_header_invalid)
- [APPLEPAY_TOKEN_EPHEMERALPUBLICKEY_INVALID](./status-codes.md#applepay_token_ephemeralpublickey_invalid)
- [APPLEPAY_TOKEN_PUBLICKEYHASH_INVALID](./status-codes.md#applepay_token_publickeyhash_invalid)
- [APPLEPAY_TOKEN_APPLICATIONDATA_INVALID](./status-codes.md#applepay_token_applicationdata_invalid)
- [APPLEPAY_TOKEN_TRANSACTIONID_INVALID](./status-codes.md#applepay_token_transactionid_invalid)
