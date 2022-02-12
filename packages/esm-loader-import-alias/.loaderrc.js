import { resolve } from 'path'

export default {
  loaders: [
    {
      loader: resolve('dist/index.js'),
      options: {
        aliases: {
          '$lib/': `${resolve('test/lib/')}/`,
        },
      },
    },
  ],
}
