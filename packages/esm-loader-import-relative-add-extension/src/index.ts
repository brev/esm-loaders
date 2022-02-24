import createLoader from 'create-esm-loader'
import { extname } from 'path'
import { fileURLToPath } from 'url'

type Options = {
  parentURL: string
  url: string
  debug?: boolean
  extensions?: Record<string, string>
}

const NAME = 'esm-loader-import-relative-add-extension'

// create-esm-loader config

const config = {
  transform: async (source: Buffer, options: Options) => {
    const { url, extensions } = options
    if (url.startsWith('node:')) return undefined

    const urlExt = extname(fileURLToPath(url))
    if (!extensions || !extensions[urlExt]) return undefined

    const newExt = extensions[urlExt]
    let sourceStr = String(source)
    // @TODO use AST to be safer
    const relatives = [
      ...[...sourceStr.matchAll(/import .*['"`](\.{0,2}\/.*)['"`]/g)],
      ...[...sourceStr.matchAll(/export .*from.*['"`](\.{0,2}\/.*)['"`]/g)],
    ]
    const imports = relatives.filter((statement) => {
      const paths = statement[1].split('/')
      return paths[paths.length - 1].split('.').length === 1
    })

    if (!imports.length) return undefined

    if (options.debug) console.log(`[${NAME}] transform: ${url}`)

    imports.forEach((statement) => {
      if (!sourceStr.includes(statement[0])) return
      const reImport = statement[0].replace(
        statement[1],
        `${statement[1]}${newExt}`
      )
      sourceStr = sourceStr.replace(statement[0], reImport)
    })

    return { source: sourceStr }
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
