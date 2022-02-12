// x2. List Export

// x2.1. Name

// x2.1.1. Single
const x211_const = 'x211_const'
let x211_let = 'x211_let'
var x211_var = 'x211_var'
export { x211_const }
export { x211_let }
export { x211_var }

// x2.1.2. Multi
const x212_const = 'x212_const'
let x212_let = 'x212_let'
var x212_var = 'x212_var'
export { x212_const, x212_let, x212_var }

// x2.2. Rename

// x2.2.1. Single
const x221_const_old = 'x221_const'
let x221_let_old = 'x221_let'
var x221_var_old = 'x221_var'
export { x221_const_old as x221_const }
export { x221_let_old as x221_let }
export { x221_var_old as x221_var }

// x2.2.2. Multi
const x222_const_old = 'x222_const'
let x222_let_old = 'x222_let'
var x222_var_old = 'x222_var'
export {
  x222_const_old as x222_const,
  x222_let_old as x222_let,
  x222_var_old as x222_var,
}
