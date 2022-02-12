import * as assert from 'uvu/assert'
import { cleanup, render } from '@testing-library/svelte'
import Complex from './Complex.svelte'
import { suite } from 'uvu'

import 'global-jsdom/register'

const test = suite('esm-loader-svelte')

test.after.each(() => cleanup())

test('Complex default', () => {
  const { getByText } = render(Complex)
  assert.ok(getByText('Hello Brave New World 23'))
})

test('Complex props', () => {
  const { getByText } = render(Complex, { phrase: 'Cruel' })
  assert.ok(getByText('Hello Cruel World 23'))
})

test.run()
