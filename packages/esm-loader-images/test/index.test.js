import * as assert from 'uvu/assert'
import imageBinary from './index.png'
import imageText from './index.svg'
import { suite } from 'uvu'

const test = suite('esm-loader-images')

test('loader', () => {
  assert.match(imageBinary, /index\.png/)
  assert.match(imageText, /<svg>/)
  assert.match(imageText, /<circle/)
  assert.match(imageText, /50/)
  assert.match(imageText, /red/)
  assert.match(imageText, /<\/svg>/)
})

test.run()
