import createLoader from 'create-esm-loader'
import { extname } from 'node:path'
import semver from 'semver'

type Options = {
  parentURL: string
  url: string
  debug?: boolean
}

const NAME = 'esm-loader-json'
const EXT = '.json'

// create-esm-loader config

const config = {
  resolve: (specifier: string, options: Options) => {
    const { debug, parentURL } = options
    const { href, pathname } = new URL(specifier, parentURL)
    if (extname(pathname) != EXT) return undefined
    if (debug) console.log(`[${NAME}] resolve: ${specifier}`)
    return {
      format: semver.gte(process.versions.node, '16.12.0')
        ? 'module' // node>=16.12
        : undefined,
      url: href,
    }
  },

  format: (url: string, options: Options) => {
    const { debug } = options
    const { pathname } = new URL(url)
    if (semver.gte(process.versions.node, '16.12.0')) return undefined
    // node<16.12
    if (extname(pathname) != EXT) return undefined
    if (debug) console.log(`[${NAME}] format: ${url}`)
    return { format: 'module' }
  },

  transform: (source: Buffer, options: Options) => {
    const { debug, url } = options
    const { pathname } = new URL(url)
    if (extname(pathname) != EXT) return undefined
    if (debug) console.log(`[${NAME}] transform: ${url}`)
    const result = `export default ${String(source)}`
    return { source: result }
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
