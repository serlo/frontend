
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./markdown.cjs.production.min.js')
} else {
  module.exports = require('./markdown.cjs.development.js')
}
