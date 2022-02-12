import * as assert from 'uvu/assert'
import typescript from './index.ts'
import { suite } from 'uvu'

const test = suite('esm-loader-typescript')

test('loader', () => {
  assert.is(typescript, 'hello')
})

test.run()
