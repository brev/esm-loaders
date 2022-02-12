import * as assert from 'uvu/assert'
import data from './data.json'
import { suite } from 'uvu'

const test = suite('esm-loader-json')

test('loader', () => {
  assert.equal(data, {
    name: 'data.json',
    author: 'me',
    location: 'California',
  })
})

test.run()
