# esm-loader-svelte

[Node.js ESModule Loader][node-loaders] for importing and loading
[Svelte][svelte] (`.svelte`) and [SvelteKit][sveltekit] files, and
transpiling on the fly.

**Warning!** Using experimental Node.js features and flags,
API will likely change. This may be helpful for development and testing,
but should not be used in production.

# Usage

```sh
npm install --save-dev esm-loader-svelte
```

We want to import a `.svelte` file with Node.js:

```html
<!-- Component.svelte -->
<script>
  const words = 'Hello'
</script>

<h1>{words} World!</h1>

<style>
  h1 {
    color: blue;
  }
</style>
```

```js
// index.js
import Component from './Component.svelte'

// render(Component) to DOM, etc.
```

## Standalone

```sh
NODE_OPTIONS="--loader esm-loader-svelte" node index.js
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
  loaders: ['esm-loader-svelte'],
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
      loader: 'esm-loader-svelte',
      options: {
        debug: true,
      },
    },
  ],
}
```

#### Preprocess

Preprocessing options can be supplied, for usage with something like
SvelteKit's [svelte-preprocess][svelte-preprocess].

Supply preprocessing options via `node-esm-loader` config file `.loaderrc.js`:

```js
// .loaderrc.js
import preprocess from 'svelte-preprocess'
import { resolve } from 'path'

export default {
  loaders: [
    {
      loader: 'esm-loader-svelte',
      options: {
        preprocess: preprocess({
          postcss: true,
          typescript: {
            tsconfigDirectory: resolve('./'),
            tsconfigFile: 'tsconfig.json',
          },
        }),
      },
    },
  ],
}
```

# SvelteKit

If `options.preprocess` is NOT found in `.loaderrc.js`, then we will try to
load a SvelteKit `svelte.config.js` file, and use the `preprocess` settings
found therein:

```js
// svelte.config.js
import preprocess from 'svelte-preprocess'
import { resolve } from 'path'

export default {
  kit: ...,
  preprocess: preprocess({
    postcss: true,
    typescript: {
      tsconfigDirectory: resolve('./'),
      tsconfigFile: 'tsconfig.json',
    }
  })
}
```

To further support loading SvelteKit, you may be interested in chaining
[additional loaders][esm-loaders]. If you are testing a SvelteKit app,
we suggest using [vitest][vitest] instead.

# Caveats

Svelte does not run some lifecycle events on the server under Node.js:
`onMount`, `beforeUpdate`, `afterUpdate`.

# License

[MIT][mit-license]

[esm-loaders]: https://github.com/brev/esm-loaders/tree/main#readme
[mit-license]: https://mit-license.org/
[node-esm-loader]: https://github.com/sebamarynissen/node-esm-loader#readme
[node-loaders]: https://nodejs.org/api/esm.html#loaders
[svelte]: https://svelte.dev/
[svelte-preprocess]: https://github.com/sveltejs/svelte-preprocess
[sveltekit]: https://kit.svelte.dev/
[vitest]: https://vitest.dev/
