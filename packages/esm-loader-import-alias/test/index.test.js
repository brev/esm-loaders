import * as assert from 'uvu/assert'
import lib from '$lib/index.js'
import { suite } from 'uvu'

const test = suite('esm-loader-import-alias')

test('loader', () => {
  assert.is(lib, 'hello')
})

test.run()
