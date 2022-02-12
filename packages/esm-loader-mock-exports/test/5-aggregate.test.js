import * as assert from 'uvu/assert'
import { suite } from 'uvu'

import { _MOCK as _MOCK_x51 } from './lib/lib-5-aggregate-1.js'
import { _MOCK as _MOCK_x52 } from './lib/lib-5-aggregate-2.js'
import { _MOCK as _MOCK_x531 } from './lib/lib-5-aggregate-3-1.js'
import { _MOCK as _MOCK_x532 } from './lib/lib-5-aggregate-3-2.js'
import { _MOCK as _MOCK_x533 } from './lib/lib-5-aggregate-3-3.js'
import { _MOCK as _MOCK_x534 } from './lib/lib-5-aggregate-3-4.js'

import {
  get_x511,
  get_x512,
  get_x521,
  get_x522,
  get_x531,
  get_x532,
  get_x533,
  get_x534,
} from './app/app-5-aggregate.js'

const test = suite('5-aggregate')

// x5.1.

test('x511', () => {
  assert.is(get_x511(), 'x111_var')

  _MOCK_x51('x111_var', 'hello')
  assert.is(get_x511(), 'hello')

  _MOCK_x51.CLEAR()
  assert.is(get_x511(), 'x111_var')
})

test('x512', () => {
  assert.is(get_x512(), 'x121_const x121_let x121_var')

  _MOCK_x51('x121_const', 'hello')
  _MOCK_x51('x121_let', 'strong')
  _MOCK_x51('x121_var', 'friend')
  assert.is(get_x512(), 'hello strong friend')

  _MOCK_x51.CLEAR()
  assert.is(get_x512(), 'x121_const x121_let x121_var')
})

// x5.2.

test('x521', () => {
  assert.is(get_x521(), 'x111_var')

  _MOCK_x52('x521', 'hello')
  assert.is(get_x521(), 'hello')

  _MOCK_x52.CLEAR()
  assert.is(get_x521(), 'x111_var')
})

test('x522', () => {
  assert.is(get_x522(), 'x121_const x121_let x121_var')

  _MOCK_x52('x522_const', 'hello')
  _MOCK_x52('x522_let', 'strong')
  _MOCK_x52('x522_var', 'friend')
  assert.is(get_x522(), 'hello strong friend')

  _MOCK_x52.CLEAR()
  assert.is(get_x522(), 'x121_const x121_let x121_var')
})

// x5.3.

test('x531', () => {
  assert.is(get_x531(), 'x411')

  _MOCK_x531('default', 'hello')
  assert.is(get_x531(), 'hello')

  _MOCK_x531.CLEAR()
  assert.is(get_x531(), 'x411')
})

test('x532', () => {
  assert.is(get_x532(), 'x411 x4_extra')

  _MOCK_x532('default', 'hello')
  _MOCK_x532('x4_extra', 'world')
  assert.is(get_x532(), 'hello world')

  _MOCK_x532.CLEAR()
  assert.is(get_x532(), 'x411 x4_extra')
})

test('x533', () => {
  assert.is(get_x533(), 'x411 x4_extra')

  _MOCK_x533('default', 'hello')
  _MOCK_x533('x533_extra', 'world')
  assert.is(get_x533(), 'hello world')

  _MOCK_x533.CLEAR()
  assert.is(get_x533(), 'x411 x4_extra')
})

test('x534', () => {
  assert.is(get_x534(), 'x411')

  _MOCK_x534('x534', 'hello')
  assert.is(get_x534(), 'hello')

  _MOCK_x534.CLEAR()
  assert.is(get_x534(), 'x411')
})

test.run()
