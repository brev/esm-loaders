import { resolve } from 'path'

export default {
  loaders: [
    {
      loader: resolve('./dist/index.js'),
      options: {
        extensions: {
          '.js': '.js',
        },
      },
    },
  ],
}
