import { resolve } from 'path'

export default {
  loaders: [
    {
      loader: resolve('./dist/index.js'),
      options: {
        meta: {
          env: {
            VITE_DATABASE_URL: 'postgres://user@localhost/db',
          },
        },
      },
    },
  ],
}
