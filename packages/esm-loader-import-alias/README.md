# esm-loader-import-alias

[Node.js ESModule Loader][node-loaders] for rewriting import path aliases.

**Warning!** Using experimental Node.js features and flags,
API will likely change. This may be helpful for development and testing,
but should not be used in production.

# Usage

Some frameworks will allow aliases in import paths (`$lib`). This loader helps
Node.js handle these aliases:

```js
import { tool } from '$lib/utils.js'
```

## Chainable

This loader can be configured, and chained with other loaders, using
[node-esm-loader][node-esm-loader].

```sh
npm install --save-dev esm-loader-import-alias node-esm-loader
```

```js
// .loaderrc.js
import { resolve } from 'path'

export default {
  loaders: [
    {
      loader: 'esm-loader-import-alias',
      options: {
        aliases: {
          // SvelteKit $lib import path alias example
          '$lib/': `${resolve('src/lib/')}/`,
        },
      },
    },
  ],
}
```

```js
// index.js
import Component from '$lib/Component.js'
```

```sh
NODE_OPTIONS="--loader node-esm-loader" node index.js
```

### Options

#### Aliases

See example above.

#### Debug

```js
// .loaderrc.js
export default {
  loaders: [
    {
      loader: 'esm-loader-import-alias',
      options: {
        debug: true,
      },
    },
  ],
}
```

### Ordering

In your loader chain:

- This loader should come **before**:
  - [esm-loader-import-relative-add-extension][esm-loader-import-relative-add-extension]

# License

[MIT][mit-license]

[esm-loader-import-relative-add-extension]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-import-relative-add-extension#readme
[mit-license]: https://mit-license.org/
[node-esm-loader]: https://github.com/sebamarynissen/node-esm-loader#readme
[node-loaders]: https://nodejs.org/api/esm.html#loaders
