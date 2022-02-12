import * as assert from 'uvu/assert'
import { suite } from 'uvu'
import welcome from './lib'

const test = suite('esm-loader-import-relative-add-extension')

test('loader', () => {
  assert.is(welcome, 'hello')
})

test.run()
