import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { Plugin, defineConfig } from 'vite'
// I wonder how many plugins we can get rid off here. Probably everything but
// the React one?
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import replace from '@rollup/plugin-replace'
import * as acorn from 'acorn'
import * as estraverse from 'estraverse'
import * as escodegen from 'escodegen'

// https://vitejs.dev/guide/build.html#library-mode

const js = (value: string) => JSON.stringify(value)

const productionKeys = ['process.env.NODE_ENV', 'process.env.NEXT_PUBLIC_ENV']

const notProvidedKeys = [
  '__NEXT_I18N_SUPPORT',
  '__NEXT_ROUTER_BASEPATH',
  '__NEXT_CLIENT_ROUTER_D_FILTER',
  '__NEXT_CLIENT_ROUTER_S_FILTER',
  '__NEXT_LINK_NO_TOUCH_START',
  '__NEXT_OPTIMISTIC_CLIENT_CACHE',
  '__NEXT_SCROLL_RESTORATION',
  '__NEXT_HAS_REWRITES',
  '__NEXT_CROSS_ORIGIN',
  '__NEXT_MANUAL_CLIENT_BASE_PATH',
  '__NEXT_STRICT_NEXT_HEAD',
  '__NEXT_TRAILING_SLASH',
  '__NEXT_EXTERNAL_MIDDLEWARE_REWRITE_RESOLVE',
  '__NEXT_CLIENT_ROUTER_FILTER_ENABLED',
  '__NEXT_MIDDLEWARE_PREFETCH',
  'NEXT_RUNTIME',
  'NEXT_DEPLOYMENT_ID',
]

const envReplacements = {
  ...Object.fromEntries(productionKeys.map((key) => [key, js('production')])),
  ...Object.fromEntries(
    notProvidedKeys.map((key) => [
      `process.env.${key}`,
      js(`NOT_PROVIDED_${key}`),
    ])
  ),
}

// Custom Rollup plugin to remove global style injection from the @editor
// package. This basically undos the cssInjectedByJsPlugin inside the editor
// package. The reason why we don't remove it from there, is because we want to
// keep the convenience of importing from the @serlo/editor package without
// having to worry about styling.
function removeGlobalEditorStyles(): Plugin {
  return {
    name: 'remove-global-styles',
    generateBundle(_, bundle) {
      let foundMatch = false

      for (const file of Object.values(bundle)) {
        if (file.type === 'chunk') {
          const chunk = file

          // Parse the code into an AST
          const ast = acorn.parse(chunk.code, {
            ecmaVersion: 2020,
            sourceType: 'module',
          })

          // Traverses the AST and look for the specific try-catch block that
          // looks something like this
          // try {
          //   if (typeof document < "u") {
          //     var t = document.createElement("style");
          //     t.appendChild(document.createTextNode(`.katex{font:....
          //   }
          // } catch (e) {
          //   console.error("vite-plugin-css-injected-by-js", e);
          // }
          estraverse.replace(ast, {
            enter(node) {
              if (
                node.type === 'TryStatement' &&
                node.handler &&
                node.handler.body &&
                node.handler.body.body.some(
                  (n) =>
                    n.type === 'ExpressionStatement' &&
                    n.expression.type === 'CallExpression' &&
                    n.expression.callee.type === 'MemberExpression' &&
                    n.expression.callee.object.name === 'console' &&
                    n.expression.callee.property.name === 'error' &&
                    n.expression.arguments.length > 0 &&
                    n.expression.arguments[0].value ===
                      'vite-plugin-css-injected-by-js'
                )
              ) {
                foundMatch = true
                // Replace the entire try-catch block with a NO_OP
                return {
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'NO_OPERATION_INSTEAD_OF_GLOBAL_STYLE',
                      },
                      init: { type: 'Literal', value: null },
                    },
                  ],
                  kind: 'const',
                }
              }
            },
          })

          // Turn AST back into code and write it into the chunk.
          chunk.code = escodegen.generate(ast)
        }
      }

      if (!foundMatch) {
        throw new Error(
          'No global style injection pattern was found and removed.'
        )
      }
    },
  }
}

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/editor-web-component.tsx'),
      name: 'EditorWebComponent',
      fileName: 'serlo-editor-web-component',
      formats: ['es'],
    },
    // We are bundling react and react-dom by not excluding them!
    rollupOptions: {},
  },
  plugins: [
    replace({ ...envReplacements, preventAssignment: false }),
    react(),
    dts({
      outDir: 'dist',
      strictOutput: true,
      rollupTypes: true,
    }),
    svgr({ include: '**/*.svg' }),
    cssInjectedByJsPlugin(),
    removeGlobalEditorStyles(),
  ],
})
