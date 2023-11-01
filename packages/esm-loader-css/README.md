# esm-loader-css

[Node.js ESModule Loader][node-loaders] for CSS and related
preprocessor stylesheets.

Supported stylesheet filename extensions:
`.css` `.less` `.pcss` `.postcss` `.sass` `.scss` `.sss` `.styl`

**Warning!** Using experimental Node.js features and flags,
API will likely change. This may be helpful for development and testing,
but should not be used in production.

## Usage

```sh
npm install --save-dev esm-loader-css
```

We want to import a `.css` file with Node.js:

```css
/* index.css */
body {
  color: blue;
}
```

```js
// index.js
import styles from './index.css'

console.dir(styles)
// "body { color: blue }"
```

### Standalone

```sh
# node >= 20.7
cat << EOF > ./register.js
import { register } from 'node:module'
register('esm-loader-css', import.meta.url)
EOF
NODE_OPTIONS="--import ./register.js" node index.js

# node < 20.7
NODE_OPTIONS="--loader esm-loader-css" node index.js
```

### Chainable

This loader can be configured, and chained with other loaders, using
[node-esm-loader][node-esm-loader].

```sh
npm install --save-dev node-esm-loader
```

```js
// .loaderrc.js
export default {
  loaders: ['esm-loader-css'],
}
```

```sh
# node >= 20.7
NODE_OPTIONS="--import node-esm-loader/register" node index.js

# node < 20.7
NODE_OPTIONS="--loader node-esm-loader" node index.js
```

#### Options

##### Debug

```js
// .loaderrc.js
export default {
  loaders: [
    {
      loader: 'esm-loader-css',
      options: {
        debug: true,
      },
    },
  ],
}
```

## Future

- Allow customization of valid css filename extensions list via `.loaderrc`
  config file?

## License

[MIT][mit-license]

[mit-license]: https://mit-license.org/
[node-esm-loader]: https://github.com/sebamarynissen/node-esm-loader#readme
[node-loaders]: https://nodejs.org/api/esm.html#loaders
