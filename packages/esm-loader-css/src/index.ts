import createLoader from 'create-esm-loader'
import { extname } from 'node:path'
import semver from 'semver'

type Options = {
  parentURL: string
  url: string
  debug?: boolean
}

const NAME = 'esm-loader-css'
const extensions = [
  '.css', // Standard
  '.less', // Less
  '.pcss', // PostCSS short
  '.postcss', // PostCSS long
  '.sass', // Sass
  '.scss', // SCSS
  '.sss', // SugarSS
  '.styl', // Stylus
]
const isCSS = (pathname: string) =>
  extensions.some((extension: string) => extension === extname(pathname))

// create-esm-loader config

const config = {
  resolve: (specifier: string, options: Options) => {
    const { debug, parentURL } = options
    const { href, pathname } = new URL(specifier, parentURL)
    if (!isCSS(pathname)) return undefined
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
    if (!isCSS(pathname)) return undefined
    if (debug) console.log(`[${NAME}] format: ${url}`)
    return { format: 'module' }
  },

  transform: (source: Buffer, options: Options) => {
    const { debug, url } = options
    const { pathname } = new URL(url)
    if (!isCSS(pathname)) return undefined
    if (debug) console.log(`[${NAME}] transform: ${url}`)
    const result = `export default ${JSON.stringify(String(source))}`
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
