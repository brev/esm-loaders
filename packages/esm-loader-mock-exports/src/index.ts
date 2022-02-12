import config from './loader.js'
import createLoader from 'create-esm-loader'

// create-esm-loader config

export default config

// node loader

export const {
  resolve,
  load,
  getFormat, // node<16.12
  getSource, // node<16.12
  transformSource, // node<16.12
} = await createLoader(config)
