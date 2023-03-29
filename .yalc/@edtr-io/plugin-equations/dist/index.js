
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./plugin-equations.cjs.production.min.js')
} else {
  module.exports = require('./plugin-equations.cjs.development.js')
}
