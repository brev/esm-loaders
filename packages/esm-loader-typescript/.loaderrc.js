import { resolve } from 'node:path'

export default {
  loaders: [
    {
      loader: resolve('./dist/index.js'),
      options: {
        config: 'test/tsconfig.json',
      },
    },
  ],
}
