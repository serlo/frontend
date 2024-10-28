import * as fs from 'fs'
import * as path from 'path'
import plugin from 'tailwindcss/plugin'
import sharedTailwindBase from './shared/tailwind-base'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [sharedTailwindBase],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/editor/src/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    plugin(function ({ addComponents }) {
      // add classes of serlo-components to autocomplete
      addComponents(extractCSSClasses())
    }),
  ],
}

function extractCSSClasses() {
  try {
    const css = fs.readFileSync(
      path.join(__dirname, '/src/assets-webkit/styles/components.css'),
      'utf-8'
    )

    const regex = /\.serlo\-[^ \:\{\n,]+/gm
    let m = ''
    const components = {}

    while ((m = regex.exec(css)) !== null) {
      // The result can be accessed through the `m`-variable.
      components[m[0]] = {}
    }

    return components
  } catch (error) {
    // don't run on client, no problem
  }
}
