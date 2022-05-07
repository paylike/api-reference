# Payments

You will not need this API if you are using our
[payment popup](https://github.com/paylike/sdk).

If you are building a web payment form, check out these
[card form helpers](https://github.com/paylike/js-card-form-tools).

- [Parameters](#parameters)
- [Types](#types)
  - [`Money`](#money)
  - [`Date`](#date)
- [Status codes](#status-codes)
- [Challenge/response](#challengeresponse)
  - [Challenge types](#challenge-types)
  - [Example client (JavaScript)](#example-client-javascript)
- [Payment plans](#payment-plans)
  - [Examples](#examples-1)

Create a new customer initiated payment order. A successful payment order
returns an authorization to later capture the funds. A payment order by itself
does not move funds.

A payment order may be for a future payment such as in a "save card" scenario or
a subscription. See the [payments plans](#payment-plans) section for further
information.

This endpoint can be used from a server or directly from the customer's device.
Tokenization of sensitive details should _always_ happen directly from the
customer's device. Tokens can then be offloaded to a server which controls the
rest of the flow. The server may need to instruct the device to e.g. load an
iframe if required by a challenge.

The payments endpoint is [challenge/response](#challengeresponse) based.

```shell
POST https://b.paylike.io/payments
```

```javascript
{
  test: {}, // required for test accounts, omit in production
  integration: {
    key: String,
  },
  text: String,  // optional

  amount: Money, // optional

  card: {
      number: Token,
      expiry: {
        month: Integer, // 1..12
        year: Integer,  // 2000..2099
      },
      code: Token,
    },
  },

  // optional
  custom,

  // optional
  plan: [
    {
      amount: Money,

      // one of:
      scheduled: Date, // future date
      // or
      repeat: {
        first: Date, // optional, default: now
        count: Integer, // optional, default: infinite, 1..
        interval: {
          unit: String, // one of: "day", "week", "month", "year"
          value: Integer, // optional, default: 1, 1..
        },
      },
    },
  ],

  // optional
  unplanned: {
    merchant: Boolean,
    customer: Boolean,
  },

  hints: Array,
}

// →

// one of:
{
  challenges: [
    {
      name: String,
      type: String, // one of: "fetch", "background-iframe", "iframe"
      path: String,
    },
  ]
}
// or
{
  authorizationId: String
}
```

## Parameters

### `integration.key`

This should be the merchant's "public key".

For testing and development use a test mode merchant's "public key" and set
`test` to the empty dictionary (`test: {}`). Omitting `test` for a test mode
merchant or vice versa will trigger a `TEST_MODE_MIXED` (error) status code. See
the [`test` parameter](#test) for more details.

### `text`

This field is optional. If none is provided, the merchant's default is used.

The text is forwarded to be shown on the customer's bank statement or similar.
There is no guarantee as to how the issuer of the customer's payment instrument
(e.g. their bank) will use or show this text.

The maximum length is 1024 characters. For payment cards (such as Visa,
Mastercard, etc.) the length must be at least 2 characters and will be truncated
to 22 characters.

### `amount`

This field is optional and of the [`Money` type](#money).

This is the (positive) amount immediately due for reservation on the customer's
payment instrument. It could be the total value of an order at a webshop or the
price of an introductory trial period for a subscription.

It should be omitted entirely for subscriptions with no amount due immediately
or agreements for later use of the payment instrument for yet unknown amounts
(e.g. "save card to account").

If the amount has a higher precision than what the payment instrument supports
it will be rounded up to the nearest supported amount (e.g. EUR 1.855 for a Visa
card will become EUR 1.86). Consult https://github.com/paylike/currencies for
the precision supported.

### `card.number`

This field should be a token of the `pcn` type as obtained from
[the vault service](https://github.com/paylike/api-reference/blob/master/vault.md).

### `card.code`

This field should be a token of the `pcsc` type as obtained from
[the vault service](https://github.com/paylike/api-reference/blob/master/vault.md).

### `card.store.customer`

This optional flag signals an agreement is made to store the payment card
details for later use by the customer themselves. For example saving payment
card data for future purchases in a webshop or to a wallet. It can only be used
for purchases that are initiated by the customer and for which the customer is
present to complete additional "challenges".

This flag can be combined with `card.store.merchant`.

### `card.store.merchant`

This optional flag signals an agreement is made to store the payment card
details for later use by the merchant. For example saving payment card details
for pay-as-you-go/usage-based subscriptions or automatic account top-ups.

For any payments series occuring in fixed intervals (e.g. monthly subscriptions)
or predetermined rates (e.g. installments) use the `plan` field instead.

This flag can be combined with `card.store.customer`.

### `custom`

This field is a free-form (JSON) field to attach information related to the
payment such as an internal reference number.

### `plan`

This field specifies future payments that is being agreed upon as of this
payment order.

Please note that the payment plan is not automatically executed. This field
merely represents the agreement made between customer and merchant as of this
payment order.

Each component represents an amount (`amount`) to be due at a future date either
once (`scheduled`) or repeated.

Repeating components begin at `repeat.first` (defaulting to "now") and repeat
indefinitely or `repeat.count` times at a fixed interval (`repeat.interval`).
Subsequent payments occur each `repeat.interval.unit * repeat.interval.value`
after `repeat.first`. `repeat.interval.value` defaults to `1`.

Please see [the examples below](#payment-plans) for common use cases.

#### Limitations

- `repeat.count` is optional only for the last component
- `scheduled` and `repeat.first` must be chronologically later than the previous
  component

### `unplanned`

Flag the types of unplanned payments the card will be used for. The supported
types are:

- `customer` (initiated by the customer from your website/application)
- `merchant` (initiated by the merchant or an off-site customer)

This is required for unplanned subsequent payments to ensure compliance and high
approval rates.

#### Example

```js
{
  // ...
  unplanned: {merchant: true},
}
```

### `hints`

This field is a list of proofs returned upon completing "challenges" to the
payment order. See the [challenge-response](#challengeresponse) section for
details.

### `test`

The `test` parameter is an "object" used to trigger a variety of real-world
scenarioes. All of its properties are optional:

```js
{
  card: {
    scheme: String, // 'supported', 'unsupported', 'unknown' (default: 'supported')
    code: String, // 'valid', 'invalid' (default: 'valid')
    status: String, // 'valid', 'invalid', 'expired', 'disabled', 'lost' (default: 'valid')
    limit: Money, // see the "Money" type section (default: infinite)
    balance: Money, // see the "Money" type section (default: infinite)
  },
  fingerprint: String, // 'timeout', 'success' (default: 'success')
  tds: {
    // 3-D Secure
    fingerprint: String, // 'timeout', 'unavailable', 'success' (default: 'success')

    challenge: Boolean, // default: true
    // for "frictionless" flow use "challenge: false"

    status: String,
    // 'authenticated', 'rejected', 'unavailable', 'attempted' (default: 'authenticated')
  },
}
```

## Types

### `Money`

To represent money with decimals in an unambiguous way pass a dictionary of
`{currency, exponent, value}` in which `currency` is the
[ISO 4217 alpha code](https://en.wikipedia.org/wiki/ISO_4217) and `exponent` is
the number of decimal places in the `value` integer.

To maximize compatibility favor the exponents in the
[currencies list](https://github.com/paylike/currencies).

#### Examples

```javascript
// € 10.99
{
  currency: 'EUR',
  exponent: 2,
  value: 1099,
}

// $ 33.00
{
  currency: 'USD',
  exponent: 2,
  value: 3300,
}
```

### `Date`

A string in
[RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6).

Example: `2021-02-22T15:32:01.909Z`

It is the default JSON representation in (at least) JavaScript
(`(new Date()).toJSON()`) and should generally be supported out-of-the-box for
the native date type when formatted as JSON.

## Status codes

- [INTERNAL_ERROR](../status-codes.md#internal_error)
- [VERSION_MISSING](../status-codes.md#version_missing)
- [VERSION_UNSUPPORTED](../status-codes.md#version_unsupported)
- [BODY_INVALID](../status-codes.md#body_invalid)
- [REQUEST_INVALID](../status-codes.md#request_invalid)
- [TOKEN_INVALID](../status-codes.md#token_invalid)
- [TOKEN_TYPE_UNEXPECTED](../status-codes.md#token_type_unexpected)
- [TEST_MODE_MIXED](../status-codes.md#test_mode_mixed)
- [PAYMENT_INTEGRATION_KEY_UNKNOWN](../status-codes.md#payment_integration_key_unknown)
- [PAYMENT_INTEGRATION_DISABLED](../status-codes.md#payment_integration_disabled)
- [PAYMENT_CHALLENGE_UNAVAILABLE](../status-codes.md#payment_challenge_unavailable)
- [PAYMENT_CARD_NUMBER_INVALID](../status-codes.md#payment_card_number_invalid)
- [PAYMENT_CARD_SCHEME_UNKNOWN](../status-codes.md#payment_card_scheme_unknown)
- [PAYMENT_CARD_SCHEME_UNSUPPORTED](../status-codes.md#payment_card_scheme_unsupported)
- [PAYMENT_CARD_SECURITY_CODE_INVALID](../status-codes.md#payment_card_security_code_invalid)
- [PAYMENT_CARD_EXPIRED](../status-codes.md#payment_card_expired)
- [PAYMENT_CARD_DISABLED](../status-codes.md#payment_card_disabled)
- [PAYMENT_CARD_LOST](../status-codes.md#payment_card_lost)
- [PAYMENT_AMOUNT_LIMIT](../status-codes.md#payment_amount_limit)
- [PAYMENT_INSUFFICIENT_FUNDS](../status-codes.md#payment_insufficient_funds)
- [PAYMENT_RECEIVER_BLOCKED](../status-codes.md#payment_receiver_blocked)
- [PAYMENT_REJECTED_BY_ISSUER](../status-codes.md#payment_rejected_by_issuer)
- [PAYMENT_REJECTED](../status-codes.md#payment_rejected)
- [PAYMENT_METHOD_ERROR](../status-codes.md#payment_method_error)
- [TDSECURE_REQUIRED](../status-codes.md#tdsecure_required)
- [TDSECURE_FAILED](../status-codes.md#tdsecure_failed)
- [TDSECURE_PARES_INVALID](../status-codes.md#tdsecure_pares_invalid)

## Challenge/response

The payment API is a so-called challenge/response interface meaning a submitted
payment order may be met with a list of challenges intead of a final response.
The client must then complete one of these challenges and submit the payment
order again including any proofs from the challenge.

An implementor can freely choose whether to manage the flow (and its state) from
the customer's device (frontend) or from their server (backend) merely relaying
challenges (as necessary) to the frontend. Challenges can be completed from the
backend unless otherwise noted for the specific challenge type.

If the response returned for a payment order has a `challenges` field, it is a
list of available challenges in prioritized order (best first). The client
should complete one of them, preferably the top one.

A challenge in the list has the format `{name, type, path}`. The client should
support each challenge type to obtain their proofs. Every proof obtained should
be added to the `hints` field (newest last).

After obtaining a proof, the client should submit the payment order once more
with the updated `hints` field to receive further challenges or a final
response.

### Challenge types

#### `fetch`

Fetch a path from the service.

The client should swap `/payments` for `path` and repeat its request (same
request method and body).

The response format is:

```javascript
{
  hints: Array,
}
```

Concatenate the existing `hints` with the list from the response (new hints
last).

#### `iframe` and `background-iframe`

Load an HTML iframe on the customer's device.

The client should swap `/payments` for `path` and repeat its request (same
request method and body).

The response format is:

```javascript
{
  action: String,
  fields: Object,
  timeout: Number, // optional, milliseconds
  hints: Array, // optional
}
```

If `hints` is present, concatenate with the existing `hints` (new hints last)
for later requests.

The client should create an HTML iframe element and submit an HTML "form" to it.
The form should have the "action" attribute of `action` and the fields ("input"
elements) with "name" and "value" pairs matching the keys and values from
`fields`.

If the type is not `background-iframe`, the size of the iframe should be at
least 390x400 pixels. It is not advised to prevent scrolling the iframe.

Once the iframe concludes it emits a "message" event of the format
`{data: {hints: Array}}`. The client should set up a listener for this event on
the `window` property. The `hints` value should be concatenated with the
existing `hints` (new hints last).

The iframe should be removed after concluding or `timeout` milliseconds, and
`/payment` requested again.

### Example client (JavaScript)

See a stub example client in [example-client.js](./example-client.js).

A proof-of-concept can be built along the lines of:

```sh
mkdir poc && cd poc
curl https://raw.githubusercontent.com/paylike/api-reference/payments/example-client.js > example.js
echo "{}" > package.json
npm install @paylike/client
echo '<script src="./dist.js"></script>' > index.html
npx browserify example.js > dist.js
open index.html
```

## Payment plans

A payment plan represents an agreement between customer and merchant about
future payments such as for usage, a subscription, or installments. They are
defined using the `plan` field.

Please note that the payment plan is _not automatically executed_. This field
merely represents the agreement made between customer and merchant as of this
payment order.

Be aware that there is no guarantee for a future payment to succeed despite the
payment plan. Read our section on
[recurring payments](https://github.com/paylike/api-docs#recurring-payments) and
plan accordingly.

Future payments may later be created from your server using
[our API by referencing the `authorizationId` as the `transactionId`](https://github.com/paylike/api-docs#using-a-previous-transaction).

### Examples

#### Monthly subscription of €9

```js
const plan = [
  {
    amount: {currency: 'EUR', value: 900, exponent: 2},
    repeat: {
      interval: {unit: 'month'},
    },
  },
]
```

The starting date, and first payment, is assumed to be "now" and thus the next
payment is exactly one month from now. The `amount` for the payment should be €9
to immediately authorize the first amount.

#### Monthly subscription of €79 with a 14 days trial

```js
const plan = [
  {
    amount: {currency: 'EUR', value: 7900, exponent: 2},
    repeat: {
      first: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      interval: {unit: 'month'},
    },
  },
]
```

The payment's `amount` would simply be omitted unless the trial has an upfront
price.

#### Biweekly (every other week) subscription of €9 charged on Fridays

```js
const plan = [
  {
    amount: {currency: 'EUR', value: 900, exponent: 2},
    repeat: {
      first: new Date('2021-01-22'), // next upcoming Friday
      interval: {
        unit: 'week',
        value: 2,
      },
    },
  },
]
```

The payment's `amount` can be used to charge a prorated amount for the time
between "now" and the first subscription payment if desirable.

#### Three months at a reduced rate

```js
const plan = [
  {
    amount: {currency: 'EUR', value: 999, exponent: 2},
    repeat: {
      interval: {unit: 'month'},
      count: 3,
    },
  },
  {
    amount: {currency: 'EUR', value: 1999, exponent: 2},
    repeat: {
      interval: {unit: 'month'},
    },
  },
]
```

#### Pay a €1100 debt at €400 monthly (installment)

```js
const plan = [
  {
    amount: {currency: 'EUR', value: 400, exponent: 2},
    scheduled: new Date('2022-02-01'),
  },
  {
    amount: {currency: 'EUR', value: 400, exponent: 2},
    scheduled: new Date('2022-03-01'),
  },
  {
    amount: {currency: 'EUR', value: 300, exponent: 2},
    scheduled: new Date('2022-04-01'),
  },
]
```
