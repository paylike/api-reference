# Status codes

These status codes are used in [API responses](README.md#response).

- [INTERNAL_ERROR](#internal_error)
- [ENDPOINT_NOT_FOUND](#endpoint_not_found)
- [VERSION_MISSING](#version_missing)
- [VERSION_UNSUPPORTED](#version_unsupported)
- [BODY_INVALID](#body_invalid)
- [REQUEST_INVALID](#request_invalid)
- [TOKEN_INVALID](#token_invalid)
- [TOKEN_TYPE_UNEXPECTED](#token_type_unexpected)
- [TEST_MODE_MIXED](#test_mode_mixed)
- [PAYMENT_INTEGRATION_KEY_UNKNOWN](#payment_integration_key_unknown)
- [PAYMENT_INTEGRATION_DISABLED](#payment_integration_disabled)
- [PAYMENT_CHALLENGE_UNAVAILABLE](#payment_challenge_unavailable)
- [PAYMENT_CARD_NUMBER_INVALID](#payment_card_number_invalid)
- [PAYMENT_CARD_SCHEME_UNKNOWN](#payment_card_scheme_unknown)
- [PAYMENT_CARD_SCHEME_UNSUPPORTED](#payment_card_scheme_unsupported)
- [PAYMENT_CARD_SECURITY_CODE_INVALID](#payment_card_security_code_invalid)
- [PAYMENT_CARD_EXPIRED](#payment_card_expired)
- [PAYMENT_CARD_DISABLED](#payment_card_disabled)
- [PAYMENT_CARD_LOST](#payment_card_lost)
- [PAYMENT_AMOUNT_LIMIT](#payment_amount_limit)
- [PAYMENT_INSUFFICIENT_FUNDS](#payment_insufficient_funds)
- [PAYMENT_RECEIVER_BLOCKED](#payment_receiver_blocked)
- [PAYMENT_REJECTED_BY_ISSUER](#payment_rejected_by_issuer)
- [PAYMENT_REJECTED](#payment_rejected)
- [PAYMENT_METHOD_ERROR](#payment_method_error)
- [TDSECURE_REQUIRED](#tdsecure_required)
- [TDSECURE_FAILED](#tdsecure_failed)
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

## `TOKEN_INVALID`

A token is invalid. A token provided in place of a sensitive value is not recognized. The `path` property of the response body tells which.

HTTP status code: 400
Message: The token for `{{path}}` is invalid

## `TOKEN_TYPE_UNEXPECTED`

A token is not of the right type. There was a mismatch between the token and the value for which is was provided. The `path` property of the response body tells which.

HTTP status code: 400
Message: The token for `{{path}}` is not of the right type

## `TEST_MODE_MIXED`

There is a mismatch between the test modes of the involved resources. The `message` property of the response body will highlight the resources.

HTTP status code: 400
Message: Mismatch of test modes: {{message}}

## `PAYMENT_INTEGRATION_KEY_UNKNOWN`

The payment integration key was not found in our records. Check that the integration key is correct.

HTTP status code: 400
Message: The payment integration key is unknown

## `PAYMENT_INTEGRATION_DISABLED`

Payments are not enabled for the integration with the specified key.

HTTP status code: 400

## `PAYMENT_CHALLENGE_UNAVAILABLE`

The requested payment challenge is not available. This might be due to a hint having expired in the meantime. In this case, restart the process by requesting `/payments` again.

HTTP status code: 400
Message: The requested payment challenge is not available

## `PAYMENT_CARD_NUMBER_INVALID`

The payment card number was rejected by the issuer saying it is invalid.

HTTP status code: 400
Message: Invalid payment card number.

## `PAYMENT_CARD_SCHEME_UNKNOWN`

The type of this payment card was not recognized from the payment card number.

HTTP status code: 400
Message: The payment card was not recognized. Try with any {{supported}}.

## `PAYMENT_CARD_SCHEME_UNSUPPORTED`

This type of payment card is unfortunately not supported.

HTTP status code: 400
Message: {{scheme}} is not supported. Try with any {{supported}}.

## `PAYMENT_CARD_SECURITY_CODE_INVALID`

The three digit security code on the payment card was declined by the issing bank as being incorrect.

HTTP status code: 400
Message: Incorrect payment card security code

## `PAYMENT_CARD_EXPIRED`

The payment card has expired.

HTTP status code: 400

## `PAYMENT_CARD_DISABLED`

The payment card has been disabled for this use by the issuing bank. The owner should contact their issuer if this is not expected.

HTTP status code: 400
Message: Payment card disabled for this use

## `PAYMENT_CARD_LOST`

The payment card has been marked as lost or stolen by the issuing bank. The owner should contact their issuer if this is not expected.

HTTP status code: 400
Message: Payment card has been marked as lost

## `PAYMENT_AMOUNT_LIMIT`

The payment method is above its amount limit. These limits are usually on a daily, weekly and monthly basis. The owner should contact their issuer to get them lifted or use another method, such as another payment card.

HTTP status code: 400

## `PAYMENT_INSUFFICIENT_FUNDS`

The payment method has not enough funds to cover for this payment.

HTTP status code: 400
Message: Insufficient funds on payment method

## `PAYMENT_RECEIVER_BLOCKED`

The receiver of the payment was blocked by the owner of the payment method. It is typically used by issuers to block subscriptions and can only be lifted by them.

HTTP status code: 400
Message: Payment receiver blocked by payment method

## `PAYMENT_REJECTED_BY_ISSUER`

The payment was rejected by the issuer of the payment method. Only the issuer has further information as to why.

HTTP status code: 400
Message: The payment was rejected

## `PAYMENT_REJECTED`

The payment was rejected by the network. This may happen due to an increased risk of fraud.

HTTP status code: 400
Message: The payment was rejected

## `PAYMENT_METHOD_ERROR`

An unexpected error happened at the underlying payment method. The state of the payment depends on the method used.

Payment cards: No funds have been withdrawn, but an amount may have been reserved. The payment card holder will be able to remove the reservation by contacting their issuing bank. Only the issuing bank may remove such reservation.

HTTP status code: 400
Message: Unexpected payment method error

## `TDSECURE_REQUIRED`

3-D Secure is required to process this payment but it was not possible to obtain.

HTTP status code: 400
Message: 3-D Secure is required but is not supported by the payment method at the moment.

## `TDSECURE_FAILED`

3-D Secure is required to process this payment but failed to be completed.

HTTP status code: 400
Message: 3-D Secure is required but failed. Please retry later.

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
