import type { ESTree } from 'meriyah'

import createLoader from 'create-esm-loader'
import esquery from 'esquery'
import { extname } from 'path'
import { fileURLToPath } from 'url'
import { generate } from 'astring'
import { parse } from 'meriyah'

type Options = {
  parentURL: string
  url: string
  debug?: boolean
  extensions?: Record<string, Record<string, string>>
}

const NAME = 'esm-loader-import-relative-extension'
const importTypes = [
  'ImportDeclaration',
  'ExportAllDeclaration',
  'ExportNamedDeclaration',
]
const parseOpts = { module: true, next: true, webcompat: true }

// create-esm-loader config

const config = {
  transform: async (source: Buffer, options: Options) => {
    const { url, extensions } = options
    if (url.startsWith('node:')) return undefined

    const urlExt = extname(fileURLToPath(url))
    if (!extensions || !extensions[urlExt]) return undefined

    const sourceStr = String(source)
    const ast = parse(sourceStr, parseOpts)
    const imports = esquery(ast, `:matches(${importTypes.join(',')})`)

    if (!imports.length) return undefined

    if (options.debug) console.log(`[${NAME}] transform: ${url}`)

    imports.forEach((importer: ESTree.ImportDeclaration) => {
      if (!(importer && importer.source && importer.source.value)) return
      const specifier = importer.source.value as string
      const fileExt = extname(specifier) || ''

      if (!/^\.{0,2}\//.test(specifier)) return
      if (!extensions[urlExt][fileExt]) return

      const newExt = extensions[urlExt][fileExt]
      importer.source.value = specifier.replace(
        new RegExp(`${fileExt}$`),
        newExt
      )
    })

    const newSource = generate(ast)
    return { source: newSource }
  },
}
export default config

// node loader

export const {
  resolve,
  load,
  getFormat, // node<16.12
  getSource, // node<16.12
  transformSource, // node<16.12
} = await createLoader(config)
