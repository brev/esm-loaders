import * as assert from 'uvu/assert'
import { suite } from 'uvu'

import { _MOCK } from './lib/lib-3-destructure.js'
import {
  get_x311,
  get_x312,
  get_x321,
  get_x322,
} from './app/app-3-destructure.js'

const test = suite('3-destructure')

// x3.1.

test('x311', () => {
  assert.is(get_x311(), 'x311_const x311_let x311_var')

  _MOCK('x311_const', 'hello')
  _MOCK('x311_let', 'strong')
  _MOCK('x311_var', 'world')
  assert.is(get_x311(), 'hello strong world')

  _MOCK.CLEAR()
  assert.is(get_x311(), 'x311_const x311_let x311_var')
})

test('x312', () => {
  assert.is(
    get_x312(),
    'x312a_const x312a_let x312a_var x312b_const x312b_let x312b_var'
  )

  _MOCK('x312a_const', 'hello')
  _MOCK('x312a_let', 'strong')
  _MOCK('x312a_var', 'friend')
  _MOCK('x312b_const', 'how')
  _MOCK('x312b_let', 'are')
  _MOCK('x312b_var', 'you')
  assert.is(get_x312(), 'hello strong friend how are you')

  _MOCK.CLEAR()
  assert.is(
    get_x312(),
    'x312a_const x312a_let x312a_var x312b_const x312b_let x312b_var'
  )
})

// x3.2.

test('x321', () => {
  assert.is(get_x321(), 'x321_const x321_let x321_var')

  _MOCK('x321_const', 'hello')
  _MOCK('x321_let', 'strong')
  _MOCK('x321_var', 'world')
  assert.is(get_x321(), 'hello strong world')

  _MOCK.CLEAR()
  assert.is(get_x321(), 'x321_const x321_let x321_var')
})

test('x322', () => {
  assert.is(
    get_x322(),
    'x322a_const x322a_let x322a_var x322b_const x322b_let x322b_var'
  )

  _MOCK('x322a_const', 'hello')
  _MOCK('x322a_let', 'strong')
  _MOCK('x322a_var', 'friend')
  _MOCK('x322b_const', 'how')
  _MOCK('x322b_let', 'are')
  _MOCK('x322b_var', 'you')
  assert.is(get_x322(), 'hello strong friend how are you')

  _MOCK.CLEAR()
  assert.is(
    get_x322(),
    'x322a_const x322a_let x322a_var x322b_const x322b_let x322b_var'
  )
})

test.run()
