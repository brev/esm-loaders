// https://github.com/sebamarynissen/create-esm-loader#1-compile-typescript-on-the-fly

import createLoader from 'create-esm-loader'
import { load as tsconfigLoad } from 'tsconfig'
import semver from 'semver'
import ts from 'typescript'

type Options = {
  parentURL: string
  url: string
  debug?: boolean
}

const NAME = 'esm-loader-typescript'
const EXT = '.ts'
const CONFIG = (await tsconfigLoad(import.meta.url)).config
CONFIG.compilerOptions.inlineSourceMap = true
if (!CONFIG.compilerOptions.module)
  CONFIG.compilerOptions.module = ts.ModuleKind.ESNext

// create-esm-loader config

const config = {
  resolve: (specifier: string, options: Options) => {
    const { debug, parentURL } = options
    if (specifier.endsWith(EXT)) {
      if (debug) console.log(`[${NAME}] resolve: ${specifier}`)
      const url = new URL(specifier, parentURL).href
      return {
        format: semver.gte(process.versions.node, '16.12.0')
          ? 'module' // node>=16.12 only
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

  transform: (source: Buffer, options: Options) => {
    const { debug, url } = options
    if (url.endsWith(EXT)) {
      if (debug) console.log(`[${NAME}] transform: ${url}`)

      const { outputText } = ts.transpileModule(String(source), {
        ...CONFIG,
        fileName: url,
      })

      return { source: outputText }
    }
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
