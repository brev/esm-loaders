import esquery from 'esquery'
import { ESTree, parse } from 'meriyah'
import { promises as fs } from 'fs'
import { resolve } from 'path'

// settings

export const parseOpts = { module: true, next: true, webcompat: true }
export const stubPath = './stubs/'

// utils

export const getExports = (ast: ESTree.Program) => {
  const exportTypes = [
    'ExportAllDeclaration',
    'ExportDefaultDeclaration',
    'ExportNamedDeclaration',
  ]
  return esquery(ast, `:matches(${exportTypes.join(',')})`)
}

export const loadStub = async (modulePath: string, file: string) => {
  const stub = await fs.readFile(resolve(modulePath, stubPath, file))
  return parse(String(stub), parseOpts)
}

export const parseBlock = (block: string) =>
  parse(`${block};`, parseOpts).body[0]

export const parseCacheSet = (key: string, value: any) => {
  if (typeof value === 'object') {
    const ast = parseBlock(
      `__MOCK.CACHE['${key}'] = null`
    ) as ESTree.ExpressionStatement
    const expression = ast.expression as ESTree.AssignmentExpression
    expression.right = value
    return ast
  } else {
    return parseBlock(
      `__MOCK.CACHE['${key}'] = ${value}`
    ) as ESTree.ExpressionStatement
  }
}

export const parseDefaultSet = (value: string) =>
  parseBlock(`__MOCK.DEFAULT = '${value}'`) as ESTree.ExpressionStatement
