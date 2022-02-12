import createLoader from 'create-esm-loader'
import escape from 'escape-string-regexp'

type Options = {
  parentURL: string
  url: string
  debug?: boolean
  aliases?: Record<string, string>
}

const NAME = 'esm-loader-import-alias'

// create-esm-loader config

const config = {
  transform: async (source: Buffer, options: Options) => {
    const { url, aliases } = options
    let sourceStr = String(source)

    if (
      !aliases ||
      !Object.keys(aliases).some((before: string) => sourceStr.includes(before))
    )
      return undefined

    if (options.debug) console.log(`[${NAME}] transform: ${url}`)

    // @TODO use AST to be safer
    for (const [before, after] of Object.entries(aliases)) {
      const imports = [
        ...[
          ...sourceStr.matchAll(
            new RegExp(`import.*['"\`](${escape(before)}).*?['"\`]`, 'g')
          ),
        ],
        ...[
          ...sourceStr.matchAll(
            new RegExp(`export.*from.*['"\`](${escape(before)}).*?['"\`]`, 'g')
          ),
        ],
      ]
      imports.forEach((statement) => {
        if (!sourceStr.includes(statement[0])) return
        const reImport = statement[0].replace(statement[1], after)
        sourceStr = sourceStr.replace(statement[0], reImport)
      })
    }

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
