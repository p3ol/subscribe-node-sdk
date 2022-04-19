# Poool Subscribe - Node SDK

Poool Subscribe SDK for Node.js 🚀


## Installation

```
yarn add @poool/subscribe-node-sdk node-fetch query-string
```

## Usage

```javascript
import Subscribe from '@poool/subscribe-node-sdk';

const subs = Subscribe({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});

subs.offers.list().then(({ offers, total }) => console.log(offers, total));
```


## [Documentation](https://poool.dev/docs/subscribe/server)

https://poool.dev/docs/subscribe/server


## Contributing

[![](https://contrib.rocks/image?repo=p3ol/subscribe-node-sdk)](https://github.com/p3ol/subscribe-node-sdk/graphs/contributors)

Please check the [CONTRIBUTING.md](https://github.com/p3ol/subscribe-node-sdk/blob/main/CONTRIBUTING.md) doc for contribution guidelines.


## Development

Install dependencies:

```bash
yarn install
```

Run examples:

```bash
yarn serve
```

And test your code:

```bash
yarn test
```


## License

This software is licensed under [MIT](https://github.com/p3ol/subscribe-node-sdk/blob/main/LICENSE).
