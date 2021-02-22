# API reference

- [Basics](#basics)
  - [Versioning](#versioning)
  - [Request (data)](#request-data)
  - [Response](#response)
- Services
  - [Vault](./vault.md)
  - [Apple Pay](./apple-pay.md)
  - [3-D Secure](./3dsecure.md)
- [Status codes](#status-codes)

## Basics

### Versioning

The `Accept-Version` header is used to specify the desired API version.

```sh
Accept-Version: 1
```

```sh
curl --header 'Accept-Version: 1'
```

### Request (data)

Any request with a body _must_ carry a header of
`Content-Type: application/json`.

```sh
curl --header 'Content-Type: application/json' --data '{"key": "value"}'
curl --header 'Content-Type: application/json' --data @data-file.json
```

### Response

Refer to the list below or the HTTP standard meanings for HTTP status codes.

- `429 Too Many Requests` (see
  [429 (rate limiting) on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429))
- `503 Service Unavailable` (see
  [503 on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503))

For more specific information the response might carry an `X-Status-Code` header
or include a `code` property in the returned JSON. Possible values are listed
under each endpoint, and [there is a complete list here](status-codes.md).

Data returned in the body is formatted as one of:

- JSON designated by the header `Content-Type: application/json`
- JSON separated by newlines designated by the header
  `Content-Type: application/x-ndjson`
