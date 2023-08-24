# Visa Account Funding Transaction (AFT)

For various reasons it may be beneficial for payments to qualify for being
processed as Visa AFTs. This document lists the minimum requirements.

- The integration used must be setup for AFTs in collaboration with the support
  team
- The payment method must support Visa AFTs, namely a Visa card or a supporting
  wallet of such
- The payment must include the data highlighted below in the specified format

Below is an excerpt from the payments object of [Payments](./index.md), where
additional information on each field is also available.

```javascript
{
  amount: Money,

  // ...

  source: {
    holder: 'destination',
  },
  destination: {
    id: /[\x20-\x7E]{1,34}/,
    holder: {
      id: /[\x20-\x7E]{1,16}/,
      name: /[\x20-\x7E]{2,30}/,
      address: /[\x20-\x7E]{1,35}/,
      city: /[\x20-\x7E]{1,25}/,

      // for country US or CA
      state: /[A-Z]{2}/,

      country: /[A-Z]{2}/, // ISO 3166-1 alpha-2 code (e.g. US)
    },
  },

  // ...
}
```

The regular expression `[\x20-\x7E]` is that of
[ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters).
