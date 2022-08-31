import * as assert from 'uvu/assert'
import hello from './lib/index' // should change to index.js
import { suite } from 'uvu'
import world from './lib.complex/index.kt' // should change to index.js

const test = suite('esm-loader-import-relative-extension')

test('loader', () => {
  assert.is(hello, 'hello')
  assert.is(world, 'world')
})

test.run()
