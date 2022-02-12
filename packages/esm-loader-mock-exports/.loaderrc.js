import { resolve } from 'path'

export default [
  {
    loader: resolve('./dist/index.js'),
    options: {
      includes: [/test/, /^(test)/],
    },
  },
]
