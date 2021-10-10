
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./legacy-editor-to-editor.cjs.production.min.js')
} else {
  module.exports = require('./legacy-editor-to-editor.cjs.development.js')
}
