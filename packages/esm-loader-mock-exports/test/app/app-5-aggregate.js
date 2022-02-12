import {
  x111_var,
  x121_const,
  x121_let,
  x121_var,
} from '../lib/lib-5-aggregate-1.js'

import {
  x521,
  x522_const,
  x522_let,
  x522_var,
} from '../lib/lib-5-aggregate-2.js'

import x531 from '../lib/lib-5-aggregate-3-1.js'
import x532, { x4_extra } from '../lib/lib-5-aggregate-3-2.js'
import x533, { x533_extra } from '../lib/lib-5-aggregate-3-3.js'
import { x534 } from '../lib/lib-5-aggregate-3-4.js'

// x5.1.

export const get_x511 = () => `${x111_var}`
export const get_x512 = () => `${x121_const} ${x121_let} ${x121_var}`

// x5.2.

export const get_x521 = () => `${x521}`
export const get_x522 = () => `${x522_const} ${x522_let} ${x522_var}`

// x5.3.

export const get_x531 = () => `${x531}`
export const get_x532 = () => `${x532} ${x4_extra}`
export const get_x533 = () => `${x533} ${x533_extra}`
export const get_x534 = () => `${x534}`
