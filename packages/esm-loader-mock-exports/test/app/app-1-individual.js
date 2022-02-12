import {
  x111_var,
  x112a_var,
  x112b_var,
  x121_const,
  x121_let,
  x121_var,
  x121_array,
  x121_func,
  x121_async,
  x121_obj,
  x121_prop,
  x121_null,
  x122a_const,
  x122a_let,
  x122a_var,
  x122b_const,
  x122b_let,
  x122b_var,
  x123_const,
  x123_array,
  x123_func,
  x13_func,
  x14_class,
  x15_gen,
  x16_async,
} from '../lib/lib-1-individual.js'

// x1.1.

export const get_x111 = () => `${x111_var}`
export const get_x112 = () => `${x112a_var} ${x112b_var}`

// x1.2.

export const get_x121 = async () =>
  [
    x121_const,
    x121_let,
    x121_var,
    x121_array[0],
    x121_func(),
    await x121_async(),
    x121_obj.x121_obj,
    x121_prop,
    x121_null,
  ].join(' ')
export const get_x122 = () =>
  [x122a_const, x122a_let, x122a_var, x122b_const, x122b_let, x122b_var].join(
    ' '
  )
export const get_x123 = () => `${x123_const} ${x123_array[0]} ${x123_func()}`

// x1.3.

export const get_x13 = () => `${x13_func()}`

// x1.4.

export const get_x14 = () => `${new x14_class().x14_method()}`

// x1.5.
export const get_x15 = () => {
  const gen = x15_gen()
  return `${gen.next().value} ${gen.next().value}`
}

// x1.6.
export const get_x16 = async () => `${await x16_async()}`

// @see: 0-api test
export const get_x121_extra = () => `${x121_const} ${x121_let} ${x121_var}`
