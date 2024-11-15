import * as fs from 'fs'
import * as path from 'path'
import plugin from 'tailwindcss/plugin'

// eslint-disable-next-line @typescript-eslint/unbound-method
export const serloEditorPlugin = plugin(function ({ addComponents }) {
  // add classes of serlo-components to autocomplete
  addComponents(extractCSSClasses())
})

function extractCSSClasses() {
  try {
    const css = fs.readFileSync(
      path.join(__dirname, '/components.css'),
      'utf-8'
    )

    const regex = /\.serlo-[^ :{\n,]+/gm
    let execArray: RegExpExecArray | null = null
    const components: Record<string, any> = {}

    while ((execArray = regex.exec(css)) !== null) {
      // The result can be accessed through the `m`-variable.
      components[execArray[0]] = {}
    }
    return components ?? {}
  } catch (error) {
    // don't run on client, no problem
    return {}
  }
}
