import * as assert from 'uvu/assert'
import stylesheet from './index.css'
import stylesheetquery from './index.css?test=test'
import { suite } from 'uvu'

const test = suite('esm-loader-css')

test('loader', () => {
  assert.is(stylesheet, 'body {\n  color: blue;\n}\n')
  assert.is(stylesheetquery, 'body {\n  color: blue;\n}\n')
})

test.run()
