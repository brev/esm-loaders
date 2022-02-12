import {
  x311_const,
  x311_let,
  x311_var,
  x312a_const,
  x312a_let,
  x312a_var,
  x312b_const,
  x312b_let,
  x312b_var,
  x321_const,
  x321_let,
  x321_var,
  x322a_const,
  x322a_let,
  x322a_var,
  x322b_const,
  x322b_let,
  x322b_var,
} from '../lib/lib-3-destructure.js'

// x3.1.

export const get_x311 = () => `${x311_const} ${x311_let} ${x311_var}`
export const get_x312 = () =>
  [x312a_const, x312a_let, x312a_var, x312b_const, x312b_let, x312b_var].join(
    ' '
  )

// x3.2.

export const get_x321 = () => `${x321_const} ${x321_let} ${x321_var}`
export const get_x322 = () =>
  [x322a_const, x322a_let, x322a_var, x322b_const, x322b_let, x322b_var].join(
    ' '
  )
