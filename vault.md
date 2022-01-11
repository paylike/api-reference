# Vault

Tokenize sensitive details for use elsewhere in the API.

```shell
POST https://vault.paylike.io
```

```javascript
{
  type: String,
  value: String,
}
// → Token
```

The type of value must be specified using the `type` parameter:

| Type   | Value                                        |
| ------ | -------------------------------------------- |
| `pcn`  | Payment card number (10-19 digits string)    |
| `pcsc` | Payment card security code (3 digits string) |

Note that APIs accepting tokens expect the _entire_ response. It is adviced
_not_ to inspect the response, but keep it as is for later use.

## Status codes

- [INTERNAL_ERROR](./status-codes.md#internal_error)
- [VERSION_MISSING](./status-codes.md#version_missing)
- [VERSION_UNSUPPORTED](./status-codes.md#version_unsupported)
- [BODY_INVALID](./status-codes.md#body_invalid)
- [REQUEST_INVALID](./status-codes.md#body_invalid)

## Example

```sh
curl https://vault.paylike.io\
  --header 'Content-Type: application/json' \
  --header 'Accept-Version: 1' \
  --data '{"type": "pcn","value":"1234123412341234"}'
# {"token":"TTSOxu13AhHPdaIIMGdeUToEQXy+Y/JviNGXDTXKyhJOWhVWbJ2W2L8EUh5k6LNKZAQCOaseXo27VgpJoug5upZSPJaFjHgjfq6bxPrlCeYBDtkCFIokleqPJTN7mco5/PwGJdyV/smuL7qmebY="}
```
