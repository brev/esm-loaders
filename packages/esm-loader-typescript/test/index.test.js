import * as assert from 'uvu/assert'
import typescript from './index.ts'
import typescriptquery from './index.ts?test=test'
import { suite } from 'uvu'

const test = suite('esm-loader-typescript')

test('loader', () => {
  assert.is(typescript, 'hello')
  assert.is(typescriptquery, 'hello')
})

test.run()
