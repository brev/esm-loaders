import { dirname } from 'path'
import esquery from 'esquery'
import { ESTree, parse } from 'meriyah'
import { fileURLToPath } from 'url'
import { generate } from 'astring'
import {
  getExports,
  loadStub,
  parseBlock,
  parseCacheSet,
  parseDefaultSet,
  parseOpts,
} from './utils.js'
import isVarName from 'is-valid-var-name'
import { klona } from 'klona/json'
import { walk } from 'estree-walker'

declare global {
  var __MOCK_internal_isVarName: (name: string) => boolean // eslint-disable-line no-var
}
if (!globalThis.__MOCK_internal_isVarName)
  globalThis.__MOCK_internal_isVarName = isVarName

type Options = {
  parentUrl: string
  url: string
  debug?: boolean
  includes?: Array<RegExp>
}

const NAME = 'esm-loader-mock-exports'

const modulePath = dirname(fileURLToPath(import.meta.url))
const stub = {
  header: await loadStub(modulePath, './header.stub.js'),
  footer: await loadStub(modulePath, './footer.stub.js'),
}

console.log(
  [
    `[${NAME}] WARNING! Using <eval>.`,
    'Run under dev/test with trusted code only!',
  ].join(' ')
)

// create-esm-loader config

export default {
  transform(source: Buffer, options: Options) {
    const { debug, includes, url } = options

    if (url.endsWith('.json') || !source || String(source).match(/_MOCK/))
      return undefined
    if (includes && !includes.some((rx: RegExp) => rx.test(url)))
      return undefined

    if (debug) console.log(`[${NAME}] transform: ${url}`)

    const ast = parse(String(source), parseOpts)
    const initial = ast.body.length
    const insert = (where: number, what: ESTree.Statement) => {
      ast.body.splice(where, 0, what)
      return where + 1
    }
    const remove = (where: number) => {
      ast.body.splice(where, 1)
      return where - 1
    }
    const renames: Map<string, string> = new Map()
    let exports = getExports(ast)

    if (!exports) return undefined

    // hoist and rewrite exports with mocking
    for (let nodeIndex = 0; nodeIndex < ast.body.length; nodeIndex++) {
      const node: Record<string, any> = ast.body[nodeIndex]

      if (!exports.includes(node)) continue

      // change 'const' exports to 'let' so bindings can be redeclared/mocked
      if (node.declaration && node.declaration.kind === 'const')
        node.declaration.kind = 'let'

      // x1.[1,2]. Hoist and rewrite 'export var name ...' style
      // x3. Hoist and rewrite destructured 'export var { name } ...' style
      for (const declarator of esquery(
        node,
        'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator'
      )) {
        const {
          id: { properties, type },
        } = declarator
        let {
          id: { name },
        } = declarator
        let renaming = false
        // hoist
        if (type === 'ObjectPattern') {
          // ... Destructuring form: export var { name } = orig; (#1)
          for (
            let propertyIndex = 0;
            propertyIndex < properties.length;
            propertyIndex++
          ) {
            const property = properties[propertyIndex]
            const { key: localNode, value: exportNode } = property
            renaming = localNode !== exportNode
            name = renaming ? exportNode.name : localNode.name
            const hoist = parseCacheSet(name, null)
            const hoistExp = hoist.expression as ESTree.AssignmentExpression
            const { expression: memberExp } = parseBlock(
              `${declarator.init.name}['${localNode.name}']`
            ) as ESTree.ExpressionStatement
            hoistExp.right = memberExp
            nodeIndex = insert(nodeIndex, hoist)
            // rewrite
            const reexport = klona(node) as ESTree.ExportNamedDeclaration
            const reexportDeclaration =
              reexport.declaration as ESTree.VariableDeclaration
            const redeclare =
              reexportDeclaration.declarations[
                node.declaration.declarations.indexOf(declarator)
              ]
            redeclare.id = renaming ? exportNode : localNode
            redeclare.init = hoistExp.left
            nodeIndex = insert(nodeIndex, reexport)
            properties.splice(propertyIndex, 1)
            propertyIndex--
            if (!properties.length) nodeIndex = remove(nodeIndex)
          }
        } else {
          // ... Regular form, not de-structuring
          const hoist = parseCacheSet(name, null)
          const hoistExp = hoist.expression as ESTree.AssignmentExpression
          hoistExp.right = declarator.init
            ? declarator.init
            : { type: 'Identifier', name }
          nodeIndex = insert(nodeIndex, hoist)
          // rewrite
          declarator.init = hoistExp.left
        }
      }

      // x1.[3,4]. hoist and rewrite 'export class|function ...' style
      for (const declaration of esquery(
        node,
        'ExportNamedDeclaration > :matches(ClassDeclaration, FunctionDeclaration)'
      )) {
        const name = declaration.id.name
        renames.set(name, `__MOCK_${name}`)
        // redeclare
        nodeIndex = insert(nodeIndex, declaration)
        // hoist
        const hoist = parseCacheSet(name, {
          type: 'Identifier',
          name: declaration.id.name,
        })
        nodeIndex = insert(nodeIndex, hoist)
        // rewrite
        const hoistExp = hoist.expression as ESTree.AssignmentExpression
        const rewrite = parseBlock(
          `let ${name} = null`
        ) as ESTree.VariableDeclaration
        rewrite.declarations[0].init = hoistExp.left
        node.declaration = rewrite
      }

      // x2. hoist and rewrite object 'export { name (as ...) }' style
      // x4.4. Hoist and rewrite default 'export { name as default }' style
      for (const specifier of esquery(
        node,
        ':not(ExportNamedDeclaration[source]) > ExportSpecifier'
      )) {
        const localName = specifier.local.name
        const exportName = specifier.exported.name
        let name = exportName
        if (exportName === localName) {
          renames.set(localName, `__MOCK_${localName}`)
        } else if (exportName === 'default') {
          name = `__MOCK_default_${localName}`
          // default alias
          const alias = parseDefaultSet(name) as ESTree.ExpressionStatement
          nodeIndex = insert(nodeIndex, alias)
        }
        // hoist
        const hoist = parseCacheSet(name, {
          type: 'Identifier',
          name: localName,
        })
        const hoistExp = hoist.expression as ESTree.AssignmentExpression
        nodeIndex = insert(nodeIndex, hoist)
        if (exportName === 'default') {
          // redeclare
          const redeclare = parseBlock(
            `let ${name} = null`
          ) as ESTree.VariableDeclaration
          redeclare.declarations[0].init = hoistExp.left
          nodeIndex = insert(nodeIndex, redeclare)
          // rewrite
          specifier.local.name = name
        } else {
          // non-default named export
          // rewrite
          const rewrite = parseBlock(
            `let ${name} = null`
          ) as ESTree.VariableDeclaration
          rewrite.declarations[0].init = hoistExp.left
          const reexport = klona({
            ...(node as ESTree.ExportNamedDeclaration),
            declaration: rewrite,
            specifiers: [],
          })
          nodeIndex = insert(nodeIndex, reexport)
          node.specifiers.splice(node.specifiers.indexOf(specifier), 1)
          if (!node.specifiers.length) nodeIndex = remove(nodeIndex)
        }
      }

      // x5. Hoist and rewrite aggregate 'export {} from ...' style
      if (
        node.type === 'ExportNamedDeclaration' &&
        node.source &&
        node.source.value
      ) {
        for (
          let specifierIndex = 0;
          specifierIndex < node.specifiers.length;
          specifierIndex++
        ) {
          const specifier = node.specifiers[specifierIndex]
          const names: Record<string, any> = {
            export: specifier.exported.name,
            local: specifier.local.name,
          }
          names.default = names.local === 'default'
          names.renamed = names.export !== names.local
          names.mock = names.renamed ? names.local : `__MOCK_${names.local}`
          names.cacheKey = (() => {
            if (names.renamed) return names.export
            else if (names.default) return names.mock
            else return names.local
          })()
          names.cacheValue = names.default
            ? `__MOCK_import_${names.local}`
            : names.mock
          names.import = (() => {
            if (names.renamed && !names.default) return names.local
            else return names.cacheValue
          })()
          // default alias
          if (names.default && !names.renamed) {
            const alias = parseDefaultSet(
              names.cacheKey
            ) as ESTree.ExpressionStatement
            nodeIndex = insert(nodeIndex, alias)
          }
          // reimport
          const reimport = klona({
            ...node,
            type: 'ImportDeclaration',
            specifiers: [
              klona({
                ...specifier,
                type:
                  names.default && !names.renamed
                    ? 'ImportDefaultSpecifier'
                    : 'ImportSpecifier',
                exported: null,
                imported: klona(
                  names.renamed ? specifier.local : specifier.exported
                ),
                local: klona({
                  ...specifier.local,
                  name: names.import,
                }),
              }) as ESTree.ImportSpecifier,
            ],
          }) as ESTree.ImportDeclaration
          nodeIndex = insert(nodeIndex, reimport)
          // hoist
          const hoist = parseCacheSet(names.cacheKey, names.cacheValue)
          nodeIndex = insert(nodeIndex, hoist)
          // redeclare
          const hoistExp = hoist.expression as ESTree.AssignmentExpression
          const redeclare = parseBlock(
            `let ${names.cacheKey} = null`
          ) as ESTree.VariableDeclaration
          redeclare.declarations[0].init = hoistExp.left
          nodeIndex = insert(nodeIndex, redeclare)
          // rewrite
          const rewrite = klona({
            ...node,
            source: null,
            specifiers: [klona(specifier)],
          }) as ESTree.ExportNamedDeclaration
          if (names.renamed)
            rewrite.specifiers[0].local = rewrite.specifiers[0].exported
          else if (names.default)
            rewrite.specifiers[0].local = klona({
              ...rewrite.specifiers[0].exported,
              name: names.mock,
            })
          nodeIndex = insert(nodeIndex, rewrite)
          node.specifiers.splice(specifierIndex, 1)
          specifierIndex--
          if (!node.specifiers.length) nodeIndex = remove(nodeIndex)
        }
      }

      // x4.[1-3]. Hoist and rewrite default 'export default ...' style
      if (node.type === 'ExportDefaultDeclaration') {
        let name = `__MOCK_default_${node.declaration.name}` // .type=Identifier
        if (
          node.declaration.type === 'ClassDeclaration' ||
          node.declaration.type === 'FunctionDeclaration'
        ) {
          const id = node.declaration.id ? node.declaration.id.name : 'anon'
          name = `__MOCK_default_${id}`
        }
        // alias
        const alias = parseDefaultSet(name) as ESTree.ExpressionStatement
        nodeIndex = insert(nodeIndex, alias)
        // hoist
        const hoist = parseCacheSet(name, node.declaration)
        nodeIndex = insert(nodeIndex, hoist)
        // redeclare
        const hoistExp = hoist.expression as ESTree.AssignmentExpression
        const redeclare = parseBlock(
          `let ${name} = null`
        ) as ESTree.VariableDeclaration
        redeclare.declarations[0].init = hoistExp.left
        nodeIndex = insert(nodeIndex, redeclare)
        // rewrite
        const reExport = parseBlock(
          `export { ${name} as default }`
        ) as ESTree.ExportNamedDeclaration
        node.type = 'ExportNamedDeclaration'
        node.declaration = null
        node.specifiers = reExport.specifiers
      }

      // x5. Hoist and rewrite bulk 'export * from ...' style
      //    'export * from ...' style is NOT supported!
      //    Not sure how to accomplish this yet.
      // if (node.type === 'ExportAllDeclaration') {}
    }

    if (ast.body.length === initial) return undefined

    exports = getExports(ast) // update

    // rename all old non-export var names to their new mocked cached names
    walk(ast, {
      enter(node, parent) {
        if (exports.includes(node)) this.skip()
        if (
          renames.has(node.name) &&
          node.type === 'Identifier' &&
          !(parent.type === 'MemberExpression' && parent.property === node)
        ) {
          const original = klona(node)
          node.name = renames.get(node.name) // rename
          if (parent.type === 'ImportSpecifier') parent.imported = original
        }
      },
    })

    ast.body = [...stub.header.body, ...ast.body, ...stub.footer.body]
    const code = generate(ast).replace(/\n+/g, '\n')
    return { source: code }
  },
}
