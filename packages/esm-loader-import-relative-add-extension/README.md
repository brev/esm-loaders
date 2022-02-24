# esm-loader-import-relative-add-extension

[Node.js ESModule Loader][node-loaders] for adding missing file extensions to
relative imports, allowing Node.js to actually resolve the file.

You can use this for `.js` files, or Node has a built-in flag
`--experimental-specifier-resolution=node` which may work instead. For any
file extensions other than `.js`, this is the loader for you.

**Warning!** Using experimental Node.js features and flags,
API will likely change. This may be helpful for development and testing,
but should not be used in production.

# Usage

For example, when using Typescript, the imports of other Typescript files are
usually suggested to NOT use any file extension:

```ts
// lib.ts
const result: Record<string, string> = {
  welcome: 'hello',
}
export default result.welcome
```

```ts
// index.ts
import welcome from './lib' // NO EXT!
console.dir(welcome) // 'hello'
```

However, if we are using loaders with Node.js, this will fail as Node has no
idea what to do with this. Using our loader, we'll add wanted file extensions
to these imports on-the-fly, allowing Node to resolve the file after all.

## Chainable

This loader can be configured, and chained with other loaders, using
[node-esm-loader][node-esm-loader].

```sh
npm install --save-dev \
  esm-loader-import-relative-add-extension \
  esm-loader-typescript \
  node-esm-loader
```

```js
// .loaderrc.js
export default {
  loaders: [
    'esm-loader-typescript',
    {
      loader: 'esm-loader-import-relative-add-extension',
      options: {
        extensions: {
          '.ts': '.ts',
        },
      },
    },
  ],
}
```

### Options

#### Extensions

```js
// .loaderrc.js
export default {
  loaders: [
    {
      loader: 'esm-loader-import-relative-add-extension',
      options: {
        extensions: {
          // Any relative imports found in .js files, which are missing a file
          //  extension, will have the '.js' extension added on-the-fly.
          '.js': '.js',

          // Any relative imports found in .ts or .svelte files, which are
          //  missing a file extension, will have the '.ts' extension added
          //  on-the-fly.
          '.ts': '.ts',
          '.svelte': '.ts',
        },
      },
    },
  ],
}
```

#### Debug

```js
// .loaderrc.js
export default {
  loaders: [
    {
      loader: 'esm-loader-import-relative-add-extension',
      options: {
        debug: true,
      },
    },
  ],
}
```

### Ordering

In your loader chain:

- This loader should come **after**:
  - [esm-loader-import-alias][esm-loader-import-alias]

# License

[MIT][mit-license]

[esm-loader-import-alias]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-import-alias#readme
[mit-license]: https://mit-license.org/
[node-esm-loader]: https://github.com/sebamarynissen/node-esm-loader#readme
[node-loaders]: https://nodejs.org/api/esm.html#loaders
