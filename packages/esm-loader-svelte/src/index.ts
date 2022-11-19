import type {
  PreprocessorGroup,
  Processed,
} from 'svelte/types/compiler/preprocess'

import { compile, preprocess as preprocessor } from 'svelte/compiler'
import createLoader from 'create-esm-loader'
import { cwd } from 'node:process'
import { fileURLToPath } from 'node:url'
import { parse } from 'node:path'
import semver from 'semver'

type Options = {
  parentURL: string
  url: string
  debug?: boolean
  preprocess?: Array<PreprocessorGroup> | PreprocessorGroup
}

const NAME = 'esm-loader-svelte'
const EXT = '.svelte'

let svelteKitPreprocess: Array<PreprocessorGroup> | PreprocessorGroup
try {
  const svelteKitConfig = (await import(`${cwd()}/svelte.config.js`)).default
  svelteKitPreprocess = svelteKitConfig.preprocess
} catch (error) {} // eslint-disable-line no-empty

// create-esm-loader config

const config = {
  resolve: (specifier: string, options: Options) => {
    const { debug, parentURL } = options
    // remove query from specifier
    specifier = specifier.split('?').shift()
    if (specifier.endsWith(EXT)) {
      if (debug) console.log(`[${NAME}] resolve: ${specifier}`)
      const url = new URL(specifier, parentURL).href
      return {
        format: semver.gte(process.versions.node, '16.12.0')
          ? 'module' // node>=16.12
          : undefined,
        url,
      }
    }
  },

  format: (url: string, options: Options) => {
    const { debug } = options
    if (semver.gte(process.versions.node, '16.12.0')) return undefined
    // node<16.12
    if (url.endsWith(EXT)) {
      if (debug) console.log(`[${NAME}] format: ${url}`)
      return { format: 'module' }
    }
  },

  transform: async (source: Buffer, options: Options) => {
    const { debug, preprocess, url } = options

    if (!url.endsWith(EXT)) return undefined

    if (debug) console.log(`[${NAME}] transform: ${url}`)

    const name = parse(url).name.replace(/[^A-Za-z0-9]/g, '')
    const filename = fileURLToPath(url)
    let sourceStr = String(source)

    // preprocess
    let processed: Processed = { map: undefined } as Processed
    const preprocessConfig = preprocess || svelteKitPreprocess
    if (preprocessConfig) {
      processed = await preprocessor(sourceStr, preprocessConfig, {
        filename,
      })
      sourceStr = String(processed.code)
    }

    // compile
    const { js, warnings } = compile(sourceStr, {
      name: name[0].toUpperCase() + name.substring(1),
      filename,
      sourcemap: preprocessConfig ? processed.map : undefined,
    })
    warnings.forEach((warning) => {
      console.warn(
        `[${NAME}] svelte compile() warnings for ${warning.filename}:`
      )
      console.warn(warning.message)
      console.warn(warning.frame)
    })

    // result
    const { code, map } = js
    const result = [code, `//# sourceMappingURL=${map.toUrl()}`].join('\n')
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
