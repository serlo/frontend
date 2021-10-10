
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./i18n.cjs.production.min.js')
} else {
  module.exports = require('./i18n.cjs.development.js')
}
