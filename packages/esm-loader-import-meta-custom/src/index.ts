import createLoader from 'create-esm-loader'

type Options = {
  parentURL: string
  url: string
  debug?: boolean
  meta?: Record<string, unknown>
}

const NAME = 'esm-loader-import-meta-custom'

// create-esm-loader config

const config = {
  transform: (source: Buffer, options: Options) => {
    const { debug, meta, url } = options

    if (!meta) return undefined

    let sourceStr = String(source)
    const importMetas = [...sourceStr.matchAll(/(import\.meta\.[\w\d.]+)/g)]

    if (!importMetas.length) return undefined

    if (debug) console.log(`[${NAME}] transform: ${url}`)

    importMetas.forEach((statement) => {
      const keys = statement[1].split('.').slice(2)
      let reImportMeta = ''

      // ignore valid import.meta.* properties
      if (keys[0].startsWith('resolve')) return
      if (keys[0].startsWith('url')) return
      if (!meta[keys[0]]) return

      const localMeta = JSON.stringify({ [keys[0]]: meta[keys[0]] })
      reImportMeta = [`(${localMeta})`, ...keys].join('.')

      if (reImportMeta)
        sourceStr = sourceStr.replace(statement[0], reImportMeta)
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
