# Apple Pay

## Tokenize

Prepare (mandatory) an Apple Pay token for use elsewhere in the API.

```shell
POST https://applepay.paylike.io/token
```

```javascript
{
    token: String,
}
// → Token
```

### Status codes

- [INTERNAL_ERROR](./status-codes.md#internal_error)
- [VERSION_MISSING](./status-codes.md#version_missing)
- [VERSION_UNSUPPORTED](./status-codes.md#version_unsupported)
- [BODY_INVALID](./status-codes.md#body_invalid)
- [REQUEST_INVALID](./status-codes.md#request_invalid)
- [APPLEPAY_TOKEN_INVALID](./status-codes.md#applepay_token_invalid)
- [APPLEPAY_CONFIGURATION_INVALID](./status-codes.md#applepay_configuration_invalid)

## Approve payment session (Apple Pay on the Web)

```shell
POST https://applepay.paylike.io/approve-payment-session
```

```javascript
{
  configurationId: String,
  validationURL: 'https://apple-pay-gateway.apple.com/paymentservices/paymentSession',
  text: String, // "displayName" of https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/requesting_an_apple_pay_payment_session
}
// →
{json: {merchantSession}}
```

### Status codes

- [INTERNAL_ERROR](./status-codes.md#internal_error)
- [VERSION_MISSING](./status-codes.md#version_missing)
- [VERSION_UNSUPPORTED](./status-codes.md#version_unsupported)
- [BODY_INVALID](./status-codes.md#body_invalid)
- [REQUEST_INVALID](./status-codes.md#request_invalid)
- [APPLEPAY_CONFIGURATION_INVALID](./status-codes.md#applepay_configuration_invalid)
- [APPLEPAY_VALIDATION_URL_INVALID](./status-codes.md#applepay_validation_url_invalid)

### Example

```javascript
const session = new ApplePaySession(3, {
  // ...
})
session.onvalidatemerchant(() => {
  // POST https://applepay.paylike.io/approve-payment-session {
  //   configurationId,
  //   text: 'Pretty Shop',
  //   validationURL: 'https://apple-pay-gateway.apple.com/paymentservices/paymentSession'
  // }
  // → merchantSession
  session.completeMerchantValidation(merchantSession)
})
session.onpaymentauthorized((e) => {
  // POST https://applepay.paylike.io/token {
  //   token: e.payment.token.paymentData
  // }
  // → token

  // POST https://b.paylike.io/payments {
  //   ...,
  //   applepay: token,
  // }
  // (complete challenges)

  session.completePayment(ApplePaySession.STATUS_SUCCESS)
  // or
  session.completePayment(ApplePaySession.STATUS_FAILURE)
})
session.begin()
```
