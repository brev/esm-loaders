import * as assert from 'uvu/assert'
import hello from './lib/index'
import { suite } from 'uvu'
import world from './lib.complex/index'

const test = suite('esm-loader-import-relative-add-extension')

test('loader', () => {
  assert.is(hello, 'hello')
  assert.is(world, 'world')
})

test.run()
