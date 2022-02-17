import x411 from '../lib/lib-4-default-1-1.js'
import x412 from '../lib/lib-4-default-1-2.js'
import x413 from '../lib/lib-4-default-1-3.js'
import x414 from '../lib/lib-4-default-1-4.js'

import x421 from '../lib/lib-4-default-2-1.js'
import x422 from '../lib/lib-4-default-2-2.js'
import x423 from '../lib/lib-4-default-2-3.js'

import x431 from '../lib/lib-4-default-3-1.js'
import x432 from '../lib/lib-4-default-3-2.js'
import x433 from '../lib/lib-4-default-3-3.js'
import x434 from '../lib/lib-4-default-3-4.js'

import x441 from '../lib/lib-4-default-4-1.js'
import x442a, { x442b } from '../lib/lib-4-default-4-2.js'

// x4.1.

export const get_x411 = () => `${x411}`
export const get_x412 = () => `${x412}`
export const get_x413 = () => `${x413}`
export const get_x414 = () => `${x414}`

// x4.2.

export const get_x421 = () => `${x421()}`
export const get_x422 = () => `${new x422().method()}`
export const get_x423 = () => {
  const gen = x423()
  return `${gen.next().value} ${gen.next().value}`
}

// x4.3.

export const get_x431 = () => `${x431()}`
export const get_x432 = () => `${new x432().method()}`
export const get_x433 = () => {
  const gen = x433()
  return `${gen.next().value} ${gen.next().value}`
}
export const get_x434 = () => `${new x434().method()} ${new x434().augment()}`

// x4.4.

export const get_x441 = () => `${x441}`
export const get_x442 = () => `${x442a} ${x442b}`
