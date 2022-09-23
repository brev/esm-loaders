// https://github.com/sebamarynissen/create-esm-loader#1-compile-typescript-on-the-fly

import type { CompilerOptions } from 'typescript'

import createLoader from 'create-esm-loader'
import { cwd } from 'node:process'
import { dirname } from 'node:path'
import semver from 'semver'
import ts from 'typescript'

type Options = {
  parentURL: string
  url: string
  config?: string
  debug?: boolean
}

const NAME = 'esm-loader-typescript'
const EXT = '.ts'

let tsConfig: CompilerOptions

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

  transform: async (source: Buffer, options: Options) => {
    const { debug, config = 'tsconfig.json', url } = options

    if (!url.endsWith(EXT)) return
    if (!tsConfig) {
      const configFileName = ts.findConfigFile(cwd(), ts.sys.fileExists, config)
      const configFile = ts.readConfigFile(
        configFileName as string,
        ts.sys.readFile
      )
      const compilerOptions = ts.parseJsonConfigFileContent(
        configFile.config,
        ts.sys,
        dirname(configFileName as string)
      )

      tsConfig = compilerOptions.options
      tsConfig.inlineSourceMap = true
      if (!tsConfig.module) tsConfig.module = ts.ModuleKind.ESNext

      if (debug) console.log(`[${NAME}] using tsconfig: ${configFileName}`)
    }

    if (debug) console.log(`[${NAME}] transform: ${url}`)

    const { outputText } = ts.transpileModule(String(source), {
      compilerOptions: tsConfig,
      fileName: url,
    })

    return { source: outputText }
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
