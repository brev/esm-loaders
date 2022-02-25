import createLoader from 'create-esm-loader'
import semver from 'semver'

type Options = {
  parentURL: string
  url: string
  debug?: boolean
}

const NAME = 'esm-loader-images'
const extsBinary = [
  /\.a?png/,
  /\.avif/,
  /\.gif/,
  /\.ico/,
  /\.jfif/,
  /\.p?jpe?g/,
  /\.pjp/,
  /\.webp/,
]
const extsText = [/\.svg/]
const extensions = [...extsBinary, ...extsText]
const isImage = (path: string) => extensions.some((rx: RegExp) => rx.test(path))
const isTextImage = (path: string) =>
  extsText.some((rx: RegExp) => rx.test(path))

// create-esm-loader config

const config = {
  resolve: (specifier: string, options: Options) => {
    const { debug, parentURL } = options
    if (!isImage(specifier)) return undefined
    if (debug) console.log(`[${NAME}] resolve: ${specifier}`)
    const url = new URL(specifier, parentURL).href
    return {
      format: semver.gte(process.versions.node, '16.12.0')
        ? 'module' // node>=16.12
        : undefined,
      url,
    }
  },

  format: (url: string, options: Options) => {
    const { debug } = options
    if (semver.gte(process.versions.node, '16.12.0')) return undefined
    // node<16.12
    if (!isImage(url)) return undefined
    if (debug) console.log(`[${NAME}] format: ${url}`)
    return { format: 'module' }
  },

  transform: (source: Buffer, options: Options) => {
    const { debug, url } = options

    if (!isImage(url)) return undefined
    if (debug) console.log(`[${NAME}] transform: ${url}`)

    const result = isTextImage(url)
      ? `export default ${JSON.stringify(String(source))}`
      : `export default ${JSON.stringify(url)}`

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
