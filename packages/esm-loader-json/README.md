# esm-loader-json

[Node.js ESModule Loader][node-loaders] for importing JSON files as modules.

This is an alternative to the Node.js `--experimental-json-modules` flag. This
flag used to work well, but as of `node>=17.1`, Node.js requires a new
[import assertion syntax][import-assert], and will fail without it. If you
are trying to load code that does not use this new syntax, you will run into
problems. Just use this loader instead of Node's built-in JSON import support,
and problems are solved.

**Warning!** This uses experimental Node.js features and flags,
whose API will likely change. This code may be helpful for development and
testing, but should not be used in production.

# Usage

```sh
npm install --save-dev esm-loader-json
```

You may have code which imports `.json` files:

```json
// data.json
{
  "name": "Vito"
}
```

```js
// index.js
import data from './data.json'
console.log(data) // { "name": "Vito" }
```

## Standalone

```sh
NODE_OPTIONS="--loader esm-loader-json" node index.js
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
  loaders: ['esm-loader-json'],
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
      loader: 'esm-loader-json',
      options: {
        debug: true,
      },
    },
  ],
}
```

# License

[MIT][mit-license]

[import-assert]: https://nodejs.org/api/esm.html#import-assertions
[mit-license]: https://mit-license.org/
[node-esm-loader]: https://github.com/sebamarynissen/node-esm-loader#readme
[node-loaders]: https://nodejs.org/api/esm.html#loaders
