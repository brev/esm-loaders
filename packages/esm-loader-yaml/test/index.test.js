import * as assert from 'uvu/assert'
import data from './data.yaml'
import { suite } from 'uvu'

const test = suite('esm-loader-yaml')

test('loader', () => {
  assert.equal(data, {
    name: 'data.yaml',
    author: 'me',
    location: 'California',
  })
})

test.run()
