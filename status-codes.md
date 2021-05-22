# Status codes

These status codes are used in [API responses](README.md#response).

- [INTERNAL_ERROR](#internal_error)
- [ENDPOINT_NOT_FOUND](#endpoint_not_found)
- [VERSION_MISSING](#version_missing)
- [VERSION_UNSUPPORTED](#version_unsupported)
- [BODY_INVALID](#body_invalid)
- [REQUEST_INVALID](#request_invalid)
- [TDSECURE_PARES_INVALID](#tdsecure_pares_invalid)
- [APPLEPAY_TOKEN_INVALID](#applepay_token_invalid)
- [APPLEPAY_VALIDATION_URL_INVALID](#applepay_validation_url_invalid)
- [APPLEPAY_CONFIGURATION_INVALID](#applepay_configuration_invalid)
- [GOOGLEPAY_TOKEN_INVALID](#googlepay_token_invalid)
- [GOOGLEPAY_CONFIGURATION_INVALID](#googlepay_configuration_invalid)
- [GOOGLEPAY_DECODING_ERROR](#googlepay_decoding_error)

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

## `REQUEST_INVALID`

Invalid `request`. Typically an input validation error. The `message` property of the response body might carry an additional clue about why.

HTTP status code: 400
Message: Invalid request: {{message}}

## `TDSECURE_PARES_INVALID`

Invalid `pares`. The `message` property of the response body might carry an additional clue about why.

HTTP status code: 400
Message: Invalid `pares`: {{message}}

## `APPLEPAY_TOKEN_INVALID`

Invalid `token`. The `message` property of the response body might carry an additional clue about why.

HTTP status code: 400
Message: Invalid token: {{message}}

## `APPLEPAY_VALIDATION_URL_INVALID`

Invalid `validationURL`.

HTTP status code: 400

## `APPLEPAY_CONFIGURATION_INVALID`

Invalid configuration. The `message` property of the response body might carry an additional clue about why.

HTTP status code: 400
Message: Invalid configuration: {{message}}

## `GOOGLEPAY_TOKEN_INVALID`

Invalid `token`. The `message` property of the response body might carry an additional clue about why.

HTTP status code: 400
Message: Invalid token: {{message}}

## `GOOGLEPAY_CONFIGURATION_INVALID`

Invalid configuration. The `message` property of the response body might carry an additional clue about why.

HTTP status code: 400
Message: Invalid configuration: {{message}}

## `GOOGLEPAY_DECODING_ERROR`

Token decoding fails. The `message` property of the response body might carry an additional clue about why.

HTTP status code: 400
Message: Token decoding fails: {{message}}
