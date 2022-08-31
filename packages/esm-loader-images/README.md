# esm-loader-images

[Node.js ESModule Loader][node-loaders] for Images.

Supported image filename extensions:

- Binary (imported as filename text string):
  - `.apng` `.avif` `.gif` `.ico` `.jpg` `.jpeg` `.jfif` `.pjpeg`
    `.pjp` `.png` `.webp`
- Text (imported as full text content string):
  - `.svg`

**Warning!** Using experimental Node.js features and flags,
API will likely change. This may be helpful for development and testing,
but should not be used in production.

# Usage

```sh
npm install --save-dev esm-loader-images
```

We want to import a `.svg` (or other image) file with Node.js:

```svg
<!-- image.svg -->
<svg>
  <circle cx="50" cy="50" r="50" fill="red" />
</svg>
```

```js
// index.js
import image from './image.svg'

console.log(image)
// "<svg><circle ... /></svg>"
```

## Standalone

```sh
NODE_OPTIONS="--loader esm-loader-images" node index.js
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
  loaders: ['esm-loader-images'],
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
      loader: 'esm-loader-images',
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
