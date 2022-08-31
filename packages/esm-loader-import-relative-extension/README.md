# esm-loader-import-relative-extension

[Node.js ESModule Loader][node-loaders] for changing or adding file extensions
on relative imports, allowing Node.js to actually resolve the file.

You can use this for `.js` files, or Node has a built-in flag
`--experimental-specifier-resolution=node` which may work instead. For any
file extensions other than `.js`, this is the loader for you.

**Warning!** Using experimental Node.js features and flags,
API will likely change. This may be helpful for development and testing,
but should not be used in production.

# Usage

For example: When using Typescript, the imports of other Typescript files are
suggested to not use any file extension, or also just use `.js`:

```ts
// lib.ts
const result: Record<string, string> = {
  welcome: 'hello',
}
export default result.welcome
```

```ts
// index.ts
import welcome from './lib' // tsc will add extension
import welcome from './lib.js' // tsc finds the right file anyway
console.dir(welcome) // 'hello'
```

However, if we are using ESM loaders with Node.js, the above will fail since
Node has no idea what those filenames are. Using our loader, we'll add/modify
wanted file extensions to these imports on-the-fly, allowing Node to resolve
the file after all.

## Chainable

This loader can be configured, and chained with other loaders, using
[node-esm-loader][node-esm-loader].

```sh
npm install --save-dev \
  esm-loader-import-relative-extension \
  esm-loader-typescript \
  node-esm-loader
```

```js
// .loaderrc.js
export default {
  loaders: [
    'esm-loader-typescript',
    {
      loader: 'esm-loader-import-relative-extension',
      options: {
        extensions: {
          '.ts': {
            '': '.ts',
            '.js': '.ts',
          },
        },
      },
    },
  ],
}
```

### Options

#### Extensions

With the options below, any relative imports found inside `.ts` files, which
are either missing a file extension, or have a `.js` extension, will be
rewritten on-the-fly to have a `.ts` extension instead:

```js
// .loaderrc.js
export default {
  loaders: [
    {
      loader: 'esm-loader-import-relative-extension',
      options: {
        extensions: {
          '.ts': {
            '': '.ts'
            '.js': '.ts',
          },
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
      loader: 'esm-loader-import-relative-extension',
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
