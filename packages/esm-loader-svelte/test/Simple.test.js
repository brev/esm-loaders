import * as assert from 'uvu/assert'
import { cleanup, render } from '@testing-library/svelte'
import Simple from './Simple.svelte'
import { suite } from 'uvu'

import 'global-jsdom/register'

const test = suite('esm-loader-svelte')

test.after.each(() => cleanup())

test('Simple default', () => {
  const { getByText } = render(Simple)
  assert.ok(getByText('Hello Brave New World'))
})

test('Simple props', () => {
  const { getByText } = render(Simple, { phrase: 'Cruel' })
  assert.ok(getByText('Hello Cruel World'))
})

test.run()
