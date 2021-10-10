
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./edtr-io.cjs.production.min.js')
} else {
  module.exports = require('./edtr-io.cjs.development.js')
}
