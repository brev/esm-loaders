import * as assert from 'uvu/assert'
import data from './data.yaml'
import dataQuery from './data.yaml?test=test'
import { suite } from 'uvu'

const test = suite('esm-loader-yaml')

test('loader', () => {
  assert.equal(data, {
    name: 'data.yaml',
    author: 'me',
    location: 'California',
  })

  assert.equal(dataQuery, {
    name: 'data.yaml',
    author: 'me',
    location: 'California',
  })
})

test.run()
