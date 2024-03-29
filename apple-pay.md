# Apple Pay

In order to accept Apple Pay payments, please contact customer service to obtain
a `configurationId` and an Apple payment processing certificate allowing us to
decode your tokens.

## Tokenize

Prepare (mandatory) an Apple Pay token for use elsewhere in the API.

```shell
POST https://applepay.paylike.io/token
```

```javascript
{
    token: String,
}
// → Token (as obtained from Apple Pay on web or iOS)
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
Accept-Version: 2
```

```javascript
{
  configurationId: String,
  text: String, // "displayName" of https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/requesting_an_apple_pay_payment_session
}
// →
merchantSession
```

### Status codes

- [INTERNAL_ERROR](./status-codes.md#internal_error)
- [VERSION_MISSING](./status-codes.md#version_missing)
- [VERSION_UNSUPPORTED](./status-codes.md#version_unsupported)
- [BODY_INVALID](./status-codes.md#body_invalid)
- [REQUEST_INVALID](./status-codes.md#request_invalid)
- [APPLEPAY_CONFIGURATION_INVALID](./status-codes.md#applepay_configuration_invalid)
- [APPLEPAY_UNREGISTERED_APPLE_DOMAIN](./status-codes.md#applepay_unregistered_apple_domain)

### Example

```javascript
import Paylike from 'https://esm.sh/@paylike/client@1.0.0'
const paylike = Paylike()

const session = new ApplePaySession(3, {
  // ...
})
session.onvalidatemerchant(() => {
  const text = 'Pretty Shop'
  paylike.applepay
    .approvePaymentSession(configurationId, text)
    .then((merchantSession) =>
      session.completeMerchantValidation(merchantSession)
    )
})
session.onpaymentauthorized((e) => {
  paylike.applepay
    .tokenize(e.payment.token.paymentData)
    .then((token) =>
      pay({
        test: {},
        integration: {
          // "public key"
          key: '57d23ce1-b651-4b37-8bfb-d4077c3bbf38',
        },
        amount: {
          // EUR 1.99
          currency: 'EUR',
          exponent: 2,
          value: 199,
        },
        applepay: token,
      })
    )
    .then(
      (r) => {
        session.completePayment(ApplePaySession.STATUS_SUCCESS)
        console.log(r)
      },
      (err) => {
        session.completePayment(ApplePaySession.STATUS_FAILURE)
        console.error(err)
      }
    )
})
session.begin()
```
