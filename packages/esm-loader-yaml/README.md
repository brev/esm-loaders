# esm-loader-yaml

[Node.js ESModule Loader][node-loaders] for importing YAML files as modules.

**Warning!** This uses experimental Node.js features and flags,
whose API will likely change. This code may be helpful for development and
testing, but should not be used in production.

# Usage

```sh
npm install --save-dev esm-loader-yaml
```

You may have code which imports `.yaml` files:

```yaml
# data.yaml
- name: Vito
```

```js
// index.js
import data from './data.yaml'
console.log(data) // { "name": "Vito" }
```

## Standalone

```sh
NODE_OPTIONS="--loader esm-loader-yaml" node index.js
```

## Chainable

This loader can be configured, and chained with other loaders, using
[node-esm-loader][node-esm-loader].

```sh
npm install --save-dev node-esm-loader
```

```js
// .loaderrc.js
export default {
  loaders: ['esm-loader-yaml'],
}
```

```sh
NODE_OPTIONS="--loader node-esm-loader" node index.js
```

### Options

#### Debug

```js
// .loaderrc.js
export default {
  loaders: [
    {
      loader: 'esm-loader-yaml',
      options: {
        debug: true,
      },
    },
  ],
}
```

# License

[MIT][mit-license]

# Author

Larry Maccherone [@lmaccherone](https://github.com/lmaccherone)

[mit-license]: https://mit-license.org/
[node-esm-loader]: https://github.com/sebamarynissen/node-esm-loader#readme
[node-loaders]: https://nodejs.org/api/esm.html#loaders
