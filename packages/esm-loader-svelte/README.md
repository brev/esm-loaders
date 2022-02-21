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
NODE_OPTIONS="--experimental-loader esm-loader-svelte" node index.js
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
NODE_OPTIONS="--experimental-loader node-esm-loader" node index.js
```

### Option: Debug

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

### Option: Preprocess

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

### SvelteKit

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

To complete your support of SvelteKit, you may want to add these additional
loaders to your chain:

- [esm-loader-typescript][esm-loader-typescript]: For loading `.ts` files.
- [esm-loader-css][esm-loader-css]: For loading `.css` and stylesheet files.
- [esm-loader-json][esm-loader-json]: For loading `.json` files. Especially
  helpful for getting around json import assertions in `node>=17.1`.
- [esm-loader-import-alias][esm-loader-import-alias]: For handling import path
  aliases (`$app`, `$lib`, etc.)
- [esm-loader-import-meta-custom][esm-loader-import-meta-custom]: For handling
  custom `import.meta.*` properties.
- [esm-loader-import-relative-add-extension][esm-loader-import-relative-add-extension]:
  Add wanted file extensions to relative imports which are missing them,
  allowing Node.js to find the files on the filesystem (good for
  extensionless `.ts` imports).
- [esm-loader-mock-exports][esm-loader-mock-exports]: For mocking and stubbing
  the exports of any imported ESModules, great for testing. This is useful
  to mock contextual stores before components are rendered.

# Caveats

## Lifecycle Events

By current Svelte design, some lifecycle events do not run on the server:
`onMount`, `beforeUpdate`, `afterUpdate`. More context is here:
https://github.com/sveltejs/svelte/issues/7267.

You can still test these lifecycle events by using a slightly verbose
workaround:

```html
<!-- Component.svelte -->
<script>
  import { onMount } from 'svelte'

  let name = 'Alice'

  export const onMountHandle = () => {
    name = 'Bob'
  }

  onMount(onMountHandle)
</script>

<div>
  <h1>{name}</h1>
</div>
```

```js
// Component.test.js
test('onMount', async () => {
  const { component, findByText, getByText } = render(Component)
  assert.ok(getByText('Alice'))

  component.onMountHandle()
  assert.ok(await findByText('Bob'))
})
```

# License

[MIT][mit-license]

[esm-loader-css]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-css#readme
[esm-loader-import-alias]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-import-alias#readme
[esm-loader-import-meta-custom]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-import-meta-custom#readme
[esm-loader-import-relative-add-extension]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-import-relative-add-extension#readme
[esm-loader-json]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-json#readme
[esm-loader-mock-exports]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-mock-exports#readme
[esm-loader-svelte]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-svelte#readme
[esm-loader-typescript]: https://github.com/brev/esm-loaders/tree/main/packages/esm-loader-typescript#readme
[mit-license]: https://mit-license.org/
[node-esm-loader]: https://github.com/sebamarynissen/node-esm-loader#readme
[node-loaders]: https://nodejs.org/api/esm.html#loaders
[svelte]: https://svelte.dev/
[svelte-preprocess]: https://github.com/sveltejs/svelte-preprocess
[sveltekit]: https://kit.svelte.dev/
