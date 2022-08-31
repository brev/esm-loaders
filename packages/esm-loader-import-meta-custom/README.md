# esm-loader-import-meta-custom

[Node.js ESModule Loader][node-loaders] to stub custom `import.meta.*`
properties.

This loader will ignore any valid `import.meta` properties, such as:

- `import.meta.resolve`
- `import.meta.url`

**Warning!** Using experimental Node.js features and flags,
API will likely change. This may be helpful for development and testing,
but should not be used in production.

# Usage

Some web frameworks will override `import.meta` with custom properties, not
known to Node.js. Your production web code might contain something like this:

```js
// index.js
const dbUrl = import.meta.env.VITE_DATABASE_URL
```

If you try testing this web code in isolation under Node.js it will fail, as
Node does not recoginze `import.meta.env*`.

## Chainable

This loader can be configured, and chained with other loaders, using
[node-esm-loader][node-esm-loader].

```sh
npm install --save-dev esm-loader-import-meta-custom node-esm-loader
```

```js
// .loaderrc.js
export default {
  loaders: [
    {
      loader: 'esm-loader-import-meta-custom',
      options: {
        meta: {
          env: {
            VITE_DATABASE_URL: 'postgres://user@localhost/db',
          },
        },
      },
    },
  ],
}
```

```sh
NODE_OPTIONS="--loader node-esm-loader" node index.js
```

### Options

#### Meta

See example above.

#### Debug

```js
// .loaderrc.js
export default {
  loaders: [
    {
      loader: 'esm-loader-import-meta-custom',
      options: {
        debug: true,
      },
    },
  ],
}
```

# License

[MIT][mit-license]

[mit-license]: https://mit-license.org/
[node-esm-loader]: https://github.com/sebamarynissen/node-esm-loader#readme
[node-loaders]: https://nodejs.org/api/esm.html#loaders
