import * as assert from 'uvu/assert'
import { suite } from 'uvu'

import { _MOCK as _MOCK_x411 } from './lib/lib-4-default-1-1.js'
import { _MOCK as _MOCK_x412 } from './lib/lib-4-default-1-2.js'
import { _MOCK as _MOCK_x413 } from './lib/lib-4-default-1-3.js'
import { _MOCK as _MOCK_x414 } from './lib/lib-4-default-1-4.js'

import { _MOCK as _MOCK_x421 } from './lib/lib-4-default-2-1.js'
import { _MOCK as _MOCK_x422 } from './lib/lib-4-default-2-2.js'
import { _MOCK as _MOCK_x423 } from './lib/lib-4-default-2-3.js'

import { _MOCK as _MOCK_x431 } from './lib/lib-4-default-3-1.js'
import { _MOCK as _MOCK_x432 } from './lib/lib-4-default-3-2.js'
import { _MOCK as _MOCK_x433 } from './lib/lib-4-default-3-3.js'

import { _MOCK as _MOCK_x441 } from './lib/lib-4-default-4-1.js'
import { _MOCK as _MOCK_x442 } from './lib/lib-4-default-4-2.js'

import {
  get_x411,
  get_x412,
  get_x413,
  get_x414,
  get_x421,
  get_x422,
  get_x423,
  get_x431,
  get_x432,
  get_x433,
  get_x441,
  get_x442,
} from './app/app-4-default.js'

const test = suite('4-default')

// x4.1.

test('x411', () => {
  assert.is(get_x411(), 'x411')

  _MOCK_x411('default', 'hello')
  assert.is(get_x411(), 'hello')

  _MOCK_x411.CLEAR()
  assert.is(get_x411(), 'x411')
})

test('x412', () => {
  assert.is(get_x412(), 'x412')

  _MOCK_x412('default', 'hello')
  assert.is(get_x412(), 'hello')

  _MOCK_x412.CLEAR()
  assert.is(get_x412(), 'x412')
})

test('x413', () => {
  assert.is(get_x413(), 'x413')

  _MOCK_x413('default', 'hello')
  assert.is(get_x413(), 'hello')

  _MOCK_x413.CLEAR()
  assert.is(get_x413(), 'x413')
})

test('x414', () => {
  assert.is(get_x414(), 'x414')

  _MOCK_x414('default', 'hello')
  assert.is(get_x414(), 'hello')

  _MOCK_x414.CLEAR()
  assert.is(get_x414(), 'x414')
})

// x4.2.

test('x421', () => {
  assert.is(get_x421(), 'x421')

  _MOCK_x421('default', () => 'hello')
  assert.is(get_x421(), 'hello')

  _MOCK_x421.CLEAR()
  assert.is(get_x421(), 'x421')
})

test('x422', () => {
  assert.is(get_x422(), 'x422')

  _MOCK_x422(
    'default',
    class {
      method() {
        return 'hello'
      }
    }
  )
  assert.is(get_x422(), 'hello')

  _MOCK_x422.CLEAR()
  assert.is(get_x422(), 'x422')
})

test('x423', () => {
  assert.is(get_x423(), 'x423 x423x423')

  _MOCK_x423('default', function* () {
    let count = 1
    while (true) {
      yield 'hello'.repeat(count)
      count++
    }
  })
  assert.is(get_x423(), 'hello hellohello')

  _MOCK_x423.CLEAR()
  assert.is(get_x423(), 'x423 x423x423')
})

// x4.3.

test('x431', () => {
  assert.is(get_x431(), 'x431')

  _MOCK_x431('default', () => 'hello')
  assert.is(get_x431(), 'hello')

  _MOCK_x431.CLEAR()
  assert.is(get_x431(), 'x431')
})

test('x432', () => {
  assert.is(get_x432(), 'x432')

  _MOCK_x432(
    'default',
    class {
      method() {
        return 'hello'
      }
    }
  )
  assert.is(get_x432(), 'hello')

  _MOCK_x432.CLEAR()
  assert.is(get_x432(), 'x432')
})

test('x433', () => {
  assert.is(get_x433(), 'x433 x433x433')

  _MOCK_x433('default', function* () {
    let count = 1
    while (true) {
      yield 'hello'.repeat(count)
      count++
    }
  })
  assert.is(get_x433(), 'hello hellohello')

  _MOCK_x433.CLEAR()
  assert.is(get_x433(), 'x433 x433x433')
})

// x4.4.

test('x441', () => {
  assert.is(get_x441(), 'x441')

  _MOCK_x441('default', 'hello')
  assert.is(get_x441(), 'hello')

  _MOCK_x441.CLEAR()
  assert.is(get_x441(), 'x441')
})

test('x442', () => {
  assert.is(get_x442(), 'x442a x442b')

  _MOCK_x442('default', 'hello')
  _MOCK_x442('x442b', 'world')
  assert.is(get_x442(), 'hello world')

  _MOCK_x442.CLEAR()
  assert.is(get_x442(), 'x442a x442b')
})

test.run()
