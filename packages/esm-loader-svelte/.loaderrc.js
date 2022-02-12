import preprocess from 'svelte-preprocess'
import { resolve } from 'path'

export default {
  loaders: [
    {
      loader: resolve('./dist/index.js'),
      options: {
        preprocess: preprocess({
          postcss: true,
          sourceMap: true,
          typescript: {
            tsconfigDirectory: resolve('./'),
            tsconfigFile: 'tsconfig.json',
          },
        }),
      },
    },
  ],
}
