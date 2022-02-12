import * as assert from 'uvu/assert'
import { get_x121_extra } from './app/app-1-individual.js'
import { _MOCK } from './lib/lib-1-individual.js'
import { _MOCK as actual_MOCK } from './lib/lib-0-api-1.js'
import { __MOCK as actual__MOCK } from './lib/lib-0-api-2.js'
import { suite } from 'uvu'

const test = suite('API')

test('keywords', () => {
  assert.ok(actual_MOCK)
  assert.ok(actual__MOCK)
})

test('exports', () => {
  assert.is(get_x121_extra(), 'x121_const x121_let x121_var')

  const CLEAR_const = _MOCK('x121_const', 'hello')
  const CLEAR_let = _MOCK('x121_let', 'big')
  const CLEAR_var = _MOCK('x121_var', 'spender')
  assert.is(get_x121_extra(), 'hello big spender')

  CLEAR_const()
  assert.is(get_x121_extra(), `x121_const big spender`)

  CLEAR_let()
  assert.is(get_x121_extra(), `x121_const x121_let spender`)

  CLEAR_var()
  assert.is(get_x121_extra(), `x121_const x121_let x121_var`)

  _MOCK('x121_const', 'hello2')
  _MOCK('x121_let', 'big2')
  _MOCK('x121_var', 'spender2')
  assert.is(get_x121_extra(), 'hello2 big2 spender2')

  _MOCK.CLEAR()
  assert.is(get_x121_extra(), `x121_const x121_let x121_var`)
})

test.run()
