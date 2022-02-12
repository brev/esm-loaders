// x3. Destructuring Export

// x3.1. Name

// x3.1.1. Single
const x311_map_const = { x311_const: 'x311_const' }
let x311_map_let = { x311_let: 'x311_let' }
var x311_map_var = { x311_var: 'x311_var' }
export const { x311_const } = x311_map_const
export let { x311_let } = x311_map_let
export var { x311_var } = x311_map_var

// x3.1.2. Multi
const x312_map_const = {
  x312a_const: 'x312a_const',
  x312b_const: 'x312b_const',
}
let x312_map_let = { x312a_let: 'x312a_let', x312b_let: 'x312b_let' }
var x312_map_var = { x312a_var: 'x312a_var', x312b_var: 'x312b_var' }
export const { x312a_const, x312b_const } = x312_map_const
export let { x312a_let, x312b_let } = x312_map_let
export var { x312a_var, x312b_var } = x312_map_var
// x3.2. Rename

// x3.2.1. Single
const x321_map_const = { x321_const_old: 'x321_const' }
let x321_map_let = { x321_let_old: 'x321_let' }
var x321_map_var = { x321_var_old: 'x321_var' }
export const { x321_const_old: x321_const } = x321_map_const
export let { x321_let_old: x321_let } = x321_map_let
export var { x321_var_old: x321_var } = x321_map_var

// x3.2.2. Multi
const x322_map_const = {
  x322a_const_old: 'x322a_const',
  x322b_const_old: 'x322b_const',
}
let x322_map_let = { x322a_let_old: 'x322a_let', x322b_let_old: 'x322b_let' }
var x322_map_var = { x322a_var_old: 'x322a_var', x322b_var_old: 'x322b_var' }
export const { x322a_const_old: x322a_const, x322b_const_old: x322b_const } =
  x322_map_const
export let { x322a_let_old: x322a_let, x322b_let_old: x322b_let } = x322_map_let
export var { x322a_var_old: x322a_var, x322b_var_old: x322b_var } = x322_map_var
