import * as assert from 'uvu/assert'
import hello, { world } from '$lib/index.js'
import { suite } from 'uvu'

const test = suite('esm-loader-import-alias')

test('loader', () => {
  assert.is(hello, 'hello')
  assert.is(world, 'world')
})

test.run()
