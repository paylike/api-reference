# Status codes

These status codes are used in [API responses](readme.md#response).

- [INTERNAL_ERROR](#internal_error)
- [ENDPOINT_NOT_FOUND](#endpoint_not_found)
- [VERSION_MISSING](#version_missing)
- [VERSION_UNSUPPORTED](#version_unsupported)
- [BODY_INVALID](#body_invalid)
- [VAULT_VALUE_TYPE_INVALID](#vault_value_type_invalid)
- [VAULT_VALUE_PCN_INVALID](#vault_value_pcn_invalid)
- [VAULT_VALUE_PCSC_INVALID](#vault_value_pcsc_invalid)
- [VAULT_VALUE_TDSPARES_INVALID](#vault_value_tdspares_invalid)
- [APPLEPAY_TOKEN_INVALID](#applepay_token_invalid)
- [APPLEPAY_TOKEN_VERSION_UNSUPPORTED](#applepay_token_version_unsupported)
- [APPLEPAY_TOKEN_DATA_INVALID](#applepay_token_data_invalid)
- [APPLEPAY_TOKEN_SIGNATURE_INVALID](#applepay_token_signature_invalid)
- [APPLEPAY_TOKEN_KEYPAIR_UNKNOWN](#applepay_token_keypair_unknown)
- [APPLEPAY_TOKEN_HEADER_INVALID](#applepay_token_header_invalid)
- [APPLEPAY_TOKEN_EPHEMERALPUBLICKEY_INVALID](#applepay_token_ephemeralpublickey_invalid)
- [APPLEPAY_TOKEN_PUBLICKEYHASH_INVALID](#applepay_token_publickeyhash_invalid)
- [APPLEPAY_TOKEN_APPLICATIONDATA_INVALID](#applepay_token_applicationdata_invalid)
- [APPLEPAY_TOKEN_TRANSACTIONID_INVALID](#applepay_token_transactionid_invalid)

## `INTERNAL_ERROR`

An internal error has occurred. The request has been logged and send to diagnostics. Retry the request later and contact support if the problem persists.

HTTP status code: 500

## `ENDPOINT_NOT_FOUND`

The endpoint was not found. Check the domain, path, method and querystring of the request.

HTTP status code: 404

## `VERSION_MISSING`

No API version was found in the request header. Please see [this section on versioning](readme.md#versioning).

HTTP status code: 400

## `VERSION_UNSUPPORTED`

The indicated API version is not supported. See the list of supported versions here: [versioning](readme.md#versioning).

HTTP status code: 400

## `BODY_INVALID`

The request body was not parsed correctly. The `message` property of the response body might carry an additional clue about why. See [this section](readme#request-data) for general information on how to send data.

HTTP status code: 400
Message: Invalid request body: {{message}}

## `VAULT_VALUE_TYPE_INVALID`

Invalid `type`: must be either `pcn`, `pcsc`, or `tdspares`.

HTTP status code: 400

## `VAULT_VALUE_PCN_INVALID`

Invalid `pcn`: must be 10-19 digits string.

HTTP status code: 400

## `VAULT_VALUE_PCSC_INVALID`

Invalid `pcsc`: must be 3 digits string.

HTTP status code: 400

## `VAULT_VALUE_TDSPARES_INVALID`

Invalid `tdspares`: must be base64 string, 20000 chars max.

HTTP status code: 400

## `APPLEPAY_TOKEN_INVALID`

Invalid `token`: must be JSON string, 10000 chars max.

HTTP status code: 400

## `APPLEPAY_TOKEN_VERSION_UNSUPPORTED`

Token version unsupported.

HTTP status code: 400

## `APPLEPAY_TOKEN_DATA_INVALID`

Invalid `data`: must be string.

HTTP status code: 400

## `APPLEPAY_TOKEN_SIGNATURE_INVALID`

Invalid `signature`: must be string.

HTTP status code: 400

## `APPLEPAY_TOKEN_KEYPAIR_UNKNOWN`

Unknown key pair. Token was created with an unknown public key.

HTTP status code: 400

## `APPLEPAY_TOKEN_HEADER_INVALID`

Invalid `header`: must be object.

HTTP status code: 400

## `APPLEPAY_TOKEN_EPHEMERALPUBLICKEY_INVALID`

Invalid `signature`: must be string.

HTTP status code: 400

## `APPLEPAY_TOKEN_PUBLICKEYHASH_INVALID`

Invalid `signature`: must be base64 string.

HTTP status code: 400

## `APPLEPAY_TOKEN_APPLICATIONDATA_INVALID`

Invalid `signature`: must be string.

HTTP status code: 400

## `APPLEPAY_TOKEN_TRANSACTIONID_INVALID`

Invalid `transactionId`: must be string.

HTTP status code: 400
