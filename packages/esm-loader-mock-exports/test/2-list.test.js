import * as assert from 'uvu/assert'
import {
  get_x211,
  get_x212,
  get_x213,
  get_x221,
  get_x222,
} from './app/app-2-list.js'
import { _MOCK } from './lib/lib-2-list.js'
import { suite } from 'uvu'

const test = suite('2-list')

// x2.1.

test('x211', () => {
  assert.is(get_x211(), 'x211_const x211_let x211_var')

  _MOCK('x211_const', 'hello')
  _MOCK('x211_let', 'strong')
  _MOCK('x211_var', 'world')
  assert.is(get_x211(), 'hello strong world')

  _MOCK.CLEAR()
  assert.is(get_x211(), 'x211_const x211_let x211_var')
})

test('x212', () => {
  assert.is(get_x212(), 'x212_const x212_let x212_var')

  _MOCK('x212_const', 'hello')
  _MOCK('x212_let', 'strong')
  _MOCK('x212_var', 'friend')
  assert.is(get_x212(), 'hello strong friend')

  _MOCK.CLEAR()
  assert.is(get_x212(), 'x212_const x212_let x212_var')
})

test('x213', () => {
  assert.is(get_x213(), 'x213_default x213_named')

  _MOCK('x213_default', 'hello')
  _MOCK('x213_named', 'world')
  assert.is(get_x213(), 'hello world')

  _MOCK.CLEAR()
  assert.is(get_x213(), 'x213_default x213_named')
})

// x2.2.

test('x221', () => {
  assert.is(get_x221(), 'x221_const x221_let x221_var')

  _MOCK('x221_const', 'hello')
  _MOCK('x221_let', 'strong')
  _MOCK('x221_var', 'world')
  assert.is(get_x221(), 'hello strong world')

  _MOCK.CLEAR()
  assert.is(get_x221(), 'x221_const x221_let x221_var')
})

test('x222', () => {
  assert.is(get_x222(), 'x222_const x222_let x222_var')

  _MOCK('x222_const', 'hello')
  _MOCK('x222_let', 'strong')
  _MOCK('x222_var', 'world')
  assert.is(get_x222(), 'hello strong world')

  _MOCK.CLEAR()
  assert.is(get_x222(), 'x222_const x222_let x222_var')
})

test.run()
