import * as assert from 'uvu/assert'
import { suite } from 'uvu'

const test = suite('esm-loader-import-meta-custom')

test('loader', () => {
  assert.is(import.meta.env.VITE_DATABASE_URL, 'postgres://user@localhost/db')
})

test.run()
