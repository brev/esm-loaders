# esm-loader-typescript

[Node.js ESModule Loader][node-loaders] for importing and loading
Typescript (`.ts`) files and transpiling on the fly.

**Warning!** Using experimental Node.js features and flags,
API will likely change. This may be helpful for development and testing,
but should not be used in production.

# Usage

```sh
npm install --save-dev esm-loader-typescript
```

We want to import a `.ts` file with Node.js:

```ts
// index.ts
const words: string = 'hello'
console.log(words)
// 'hello'
```

## Standalone

```sh
NODE_OPTIONS="--experimental-loader esm-loader-typescript" node index.ts
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
  loaders: ['esm-loader-typescript'],
}
```

```sh
NODE_OPTIONS="--experimental-loader node-esm-loader" node index.ts
```

### Options

#### Debug

```js
// .loaderrc.js
export default {
  loaders: [
    {
      loader: 'esm-loader-typescript',
      options: {
        debug: true,
      },
    },
  ],
}
```

# Config

If a `tsconfig.json` file is found, it will be loaded and used. Otherwise, we
provide a bare-bones default config which will be used instead.

# Related

- [esm-loader-import-relative-add-extension][esm-loader-import-relative-add-extension]:
  Typescript usually generates `.js` files, so relative imports are suggested
  to have no file extension. But in our case, since we're transpiling
  on-the-fly, these extensionless imports leave Node.js confused. Use this
  loader to add `.ts` extensions to any relative imports which are missing
  them, allowing Node.js to resolve and load the files.

# License

[MIT][mit-license]

[esm-loader-import-relative-add-extension]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-import-relative-add-extension#readme
[mit-license]: https://mit-license.org/
[node-esm-loader]: https://github.com/sebamarynissen/node-esm-loader#readme
[node-loaders]: https://nodejs.org/api/esm.html#loaders
