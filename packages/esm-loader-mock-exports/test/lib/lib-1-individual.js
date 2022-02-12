// x1. Individual Export

// x1.1. Variable

// x1.1.1. Single
var x111_var = 'x111_var' // eslint-disable-line no-unused-vars
export var x111_var // eslint-disable-line no-redeclare

// x1.1.2. Multi
var x112a_var = 'x112a_var', // eslint-disable-line no-unused-vars
  x112b_var = 'x112b_var' // eslint-disable-line no-unused-vars
export var x112a_var, x112b_var // eslint-disable-line no-redeclare

// x1.2. Assignment

// x1.2.1. Single
export const x121_const = 'x121_const'
export let x121_let = 'x121_let'
export var x121_var = 'x121_var'
export const x121_array = ['x121_array']
export const x121_func = () => 'x121_func'
export const x121_async = async () => 'x121_async'
export const x121_obj = { x121_obj: 'x121_obj' }
const x121_prop_src = { x121_prop: 'x121_prop' }
export const x121_prop = x121_prop_src['x121_prop']
export const x121_null = null

// x1.2.2. Multi
export const x122a_const = 'x122a_const',
  x122b_const = 'x122b_const'
export let x122a_let = 'x122a_let',
  x122b_let = 'x122b_let'
export var x122a_var = 'x122a_var',
  x122b_var = 'x122b_var'

// x1.2.3. Combos
export const x123_const = 'x123_const',
  x123_array = ['x123_array'],
  x123_func = () => 'x123_func'

// x1.3. Function
export function x13_func() {
  return 'x13_func'
}

// x1.4. Class
export class x14_class {
  x14_method() {
    return 'x14_class'
  }
}

// x1.5. Generator function*
export function* x15_gen() {
  let count = 1
  while (true) {
    yield 'x15_gen'.repeat(count)
    count++
  }
}

// x1.6. Async Function
export async function x16_async() {
  return 'x16_async'
}
