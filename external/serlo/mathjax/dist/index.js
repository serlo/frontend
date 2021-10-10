
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./mathjax.cjs.production.min.js')
} else {
  module.exports = require('./mathjax.cjs.development.js')
}
