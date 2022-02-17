# esm-loader-mock-exports

[Node.js ESModule Loader][node-loaders] for mocking module exports.

This loader will add a `_MOCK` named export to each loaded ESModule, which can
be used to mock the rest of its exports. This only works for
ESModules (`import`), and does not work for CommonJS (`require`) modules.

**Warning!** This uses experimental Node.js features and flags, whose API will
likely change. This may be helpful for development and testing, but should not
be used in production.

# Usage

We'll take some production code which accesses a live filesystem:

```js
// filesystem.js
import { readdirSync } from 'fs'

export const getDir = () => {
  return readdirSync('.')
}

// getDir() => ['packge.json', 'tsconfig.json', ...]
```

```js
// app.js
import { getDir } from './filesystem.js'

export const getFirst = () => {
  const files = getDir()
  return files[0]
}

// getFirst() => 'package.json'
```

Now, we want to test this code in development. We don't want to actually access
the filesystem here, so we'll mock the filesystem call:

```sh
npm install --save-dev esm-loader-mock-exports
```

```js
// app.test.js
import assert from 'assert'
import { getFirst } from './app.js'
import { _MOCK } from './filesystem.js'

const clear = _MOCK('getDir', () => ['one', 'two'])

assert.equal(getFirst(), 'one')

clear() // clear our single mock above
_MOCK.CLEAR() // alternatively, clear all mocks on this module
```

If we want to mock the `default` export of a module, instead of one of its
named exports, we just use the `default` keyword:

```js
_MOCK('default', () => 'hello world')
```

## Standalone

By default, all loaded modules will be instrumented with mocking abilities:

```sh
NODE_OPTIONS="--experimental-loader esm-loader-mock-exports" node app.test.js
```

## Chainable

This loader can be configured, and chained with other loaders, using
[node-esm-loader][node-esm-loader].

**Note:** This loader should be on the bottom of your chain, so that it
runs last.

```sh
npm install --save-dev node-esm-loader
```

```js
// .loaderrc.js
export default {
  loaders: ['esm-loader-mock-exports'],
}
```

```sh
NODE_OPTIONS="--experimental-loader node-esm-loader" node app.test.js
```

### Option: Includes

To only instrument mocks on certain specific modules, you can pass a list of
regular expressions in an `includes` option. This can increase speed and
performance, reduce chance of breakage, and reduce any security concerns.

Note: The `includes` RegExes will be tested against the final resolved module
name on the filesystem. If you are trying to mock a module named
`common/utils`, and the module resolves to `node_modules/common/dist/utils.js`,
your RegEx will look something like:

```js
// .loaderrc.js
export default {
  loaders: [
    {
      loader: 'esm-loader-mock-exports',
      options: {
        includes: [/common\/dist\/utils/],
      },
    },
  ],
}
```

### Option: Debug

```js
// .loaderrc.js
export default {
  loaders: [
    {
      loader: 'esm-loader-mock-exports',
      options: {
        debug: true,
      },
    },
  ],
}
```

# Unsupported

This loader CANNOT handle the following situations, and will skip them:

- Bulk exports from other modules (You may be able to mock a parent module at a
  higher level to accomplish the same thing):

  ```js
  export * from ...
  ```

- Class with uninitialized private field declarations:

  ```js
  class BlobDataItem {
    #path

    constructor(options) {
      this.#path = options.path
    }
  }
  ```

# Security

**Warning!** This loader uses `eval` to accomplish adding/clearing mocks.
Make sure this loader is used under development/test, with code/tests/mocks
that you trust. See the `includes` option above to restrict which modules are
instrumented with mocking abilities.

This loader will always print a warning about this during startup,
as a reminder.

# Context

There are other ESModule mocking libraries available, but they all have one
or more of these problems:

- Cannot be chained with other loaders.
- Only works for `.js` files, not any others (`.ts`, `.svelte`, etc.)

# License

[MIT][mit-license]

[export-forms]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#syntax
[mit-license]: https://mit-license.org/
[node-esm-loader]: https://github.com/sebamarynissen/node-esm-loader#readme
[node-loaders]: https://nodejs.org/api/esm.html#loaders
