import type { ESTree } from 'meriyah'

import createLoader from 'create-esm-loader'
import esquery from 'esquery'
import { generate } from 'astring'
import { parse } from 'meriyah'

type Options = {
  parentURL: string
  url: string
  debug?: boolean
  aliases?: Record<string, string>
}

const NAME = 'esm-loader-import-alias'
const importTypes = [
  'ImportDeclaration',
  'ExportAllDeclaration',
  'ExportNamedDeclaration',
]
const parseOpts = { module: true, next: true, webcompat: true }

// create-esm-loader config

const config = {
  transform: async (source: Buffer, options: Options) => {
    const { url, aliases } = options
    const aliasKeys = Object.keys(aliases || {})
    const sourceStr = String(source)

    if (
      !aliases ||
      !aliasKeys.some((alias: string) => sourceStr.includes(alias))
    )
      return undefined

    if (options.debug) console.log(`[${NAME}] transform: ${url}`)

    const ast = parse(sourceStr, parseOpts)
    const imports = esquery(ast, `:matches(${importTypes.join(',')})`)
    imports.forEach((importer: ESTree.ImportDeclaration) => {
      const value = importer.source.value as string
      aliasKeys.forEach((alias) => {
        if (value.includes(alias))
          importer.source.value = value.replace(alias, aliases[alias])
      })
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
