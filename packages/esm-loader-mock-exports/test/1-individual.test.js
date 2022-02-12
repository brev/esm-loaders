import * as assert from 'uvu/assert'
import {
  get_x111,
  get_x112,
  get_x121,
  get_x122,
  get_x123,
  get_x13,
  get_x14,
  get_x15,
  get_x16,
} from './app/app-1-individual.js'
import { _MOCK } from './lib/lib-1-individual.js'
import { suite } from 'uvu'

const test = suite('1-individual')

// x1.1.

test('x111', () => {
  assert.is(get_x111(), 'x111_var')

  _MOCK('x111_var', 'hello')
  assert.is(get_x111(), 'hello')

  _MOCK.CLEAR()
  assert.is(get_x111(), 'x111_var')
})

test('x112', () => {
  assert.is(get_x112(), 'x112a_var x112b_var')

  _MOCK('x112a_var', 'hello')
  _MOCK('x112b_var', 'world')
  assert.is(get_x112(), 'hello world')

  _MOCK.CLEAR()
  assert.is(get_x112(), 'x112a_var x112b_var')
})

// x1.2.

test('x121', async () => {
  assert.is(
    await get_x121(),
    [
      'x121_const',
      'x121_let',
      'x121_var',
      'x121_array',
      'x121_func',
      'x121_async',
      'x121_obj',
      'x121_prop',
      '',
    ].join(' ')
  )

  _MOCK('x121_const', 'hello')
  _MOCK('x121_let', 'big')
  _MOCK('x121_var', 'spender')
  _MOCK('x121_array', ['september'])
  _MOCK('x121_func', () => 'weather')
  _MOCK('x121_async', async () => 'sweater')
  _MOCK('x121_obj', { x121_obj: 'ender' })
  _MOCK('x121_prop', 'game')
  _MOCK('x121_null', 'space')
  assert.is(
    await get_x121(),
    'hello big spender september weather sweater ender game space'
  )

  _MOCK.CLEAR()
  assert.is(
    await get_x121(),
    [
      'x121_const',
      'x121_let',
      'x121_var',
      'x121_array',
      'x121_func',
      'x121_async',
      'x121_obj',
      'x121_prop',
      '',
    ].join(' ')
  )
})

test('x122', () => {
  assert.is(
    get_x122(),
    'x122a_const x122a_let x122a_var x122b_const x122b_let x122b_var'
  )

  _MOCK('x122a_const', 'hello')
  _MOCK('x122a_let', 'strong')
  _MOCK('x122a_var', 'friend')
  _MOCK('x122b_const', 'fresh')
  _MOCK('x122b_let', 'jive')
  _MOCK('x122b_var', 'sucka')
  assert.is(get_x122(), 'hello strong friend fresh jive sucka')

  _MOCK.CLEAR()
  assert.is(
    get_x122(),
    'x122a_const x122a_let x122a_var x122b_const x122b_let x122b_var'
  )
})

test('x123', () => {
  assert.is(get_x123(), 'x123_const x123_array x123_func')

  _MOCK('x123_const', 'hello')
  _MOCK('x123_array', ['strong'])
  _MOCK('x123_func', () => 'friend')
  assert.is(get_x123(), 'hello strong friend')

  _MOCK.CLEAR()
  assert.is(get_x123(), 'x123_const x123_array x123_func')
})

// x1.3.

test('x13', () => {
  assert.is(get_x13(), 'x13_func')

  function x13_func_mock() {
    return 'welcome'
  }
  _MOCK('x13_func', x13_func_mock)
  assert.is(get_x13(), 'welcome')

  _MOCK.CLEAR()
  assert.is(get_x13(), 'x13_func')
})

// x1.4.

test('x14', () => {
  assert.is(get_x14(), 'x14_class')

  class x14_class_mock {
    x14_method() {
      return 'bueno'
    }
  }
  _MOCK('x14_class', x14_class_mock)
  assert.is(get_x14(), 'bueno')

  _MOCK.CLEAR()
  assert.is(get_x14(), 'x14_class')
})

// x1.5.

test('x15', () => {
  assert.is(get_x15(), 'x15_gen x15_genx15_gen')

  _MOCK('x15_gen', function* () {
    let count = 1
    while (true) {
      yield 'hello'.repeat(count)
      count++
    }
  })
  assert.is(get_x15(), 'hello hellohello')

  _MOCK.CLEAR()
  assert.is(get_x15(), 'x15_gen x15_genx15_gen')
})

// x1.6.

test('x16', async () => {
  assert.is(await get_x16(), 'x16_async')

  async function x16_async_mock() {
    return 'welcome'
  }
  _MOCK('x16_async', x16_async_mock)
  assert.is(await get_x16(), 'welcome')

  _MOCK.CLEAR()
  assert.is(await get_x16(), 'x16_async')
})

test.run()
