import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { Plugin, defineConfig } from 'vite'
// I wonder how many plugins we can get rid off here. Probably everything but
// the React one?
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import * as acorn from 'acorn'
import * as estraverse from 'estraverse'
import * as escodegen from 'escodegen'
import { type Program, type Node } from 'estree'
import replace from '@rollup/plugin-replace'

// https://vitejs.dev/guide/build.html#library-mode

// We already strip most of the env variables in the built of the editor,
// however React seems to reintroduce this one!
const envReplacements = {
  'process.env.NODE_ENV': JSON.stringify('production'),
}

function parseCodeToAST(code: string): Program {
  return acorn.parse(code, {
    ecmaVersion: 2020,
    sourceType: 'module',
  }) as Program
}

function generateCodeFromAST(ast: Node) {
  return escodegen.generate(ast)
}

type PatternMatcher = (node: Node) => boolean

function removePattern(
  ast: Program,
  patternMatcher: PatternMatcher,
  replacement: Node
) {
  let foundMatch = false

  estraverse.replace(ast, {
    enter(node) {
      if (patternMatcher(node)) {
        foundMatch = true

        // We only want to replace the body of functions, and not the whole
        // function!
        if (node.type === 'FunctionDeclaration') {
          if (replacement.type !== 'BlockStatement') {
            throw new Error(
              'Replacement for function body must be a BlockStatement'
            )
          }

          // Replace function body, no need to return
          node.body = replacement
        } else {
          // Replace entire node
          return replacement
        }
      }
    },
  })

  return { ast, foundMatch }
}

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
function matchGlobalStyleInjection(node: Node): boolean {
  return (
    node.type === 'TryStatement' &&
    node.handler !== undefined &&
    node.handler !== null &&
    node.handler.body !== undefined &&
    node.handler.body.body.some(
      (n) =>
        n.type === 'ExpressionStatement' &&
        n.expression.type === 'CallExpression' &&
        n.expression.callee.type === 'MemberExpression' &&
        n.expression.callee.object.type === 'Identifier' &&
        n.expression.callee.object.name === 'console' &&
        n.expression.callee.property.type === 'Identifier' &&
        n.expression.callee.property.name === 'error' &&
        n.expression.arguments.length > 0 &&
        n.expression.arguments[0].type === 'Literal' &&
        n.expression.arguments[0].value === 'vite-plugin-css-injected-by-js'
    )
  )
}

// Traverses the AST and matches the addStyle function body that looks something
// like this (see function l to see why we only replace the function body and
// not the whole function):

// return (() => {
//   o.r(a), o.d(a, {
//       addStyles: () => l,
//       EditableMathField: () => c,
//       StaticMathField: () => u,
//       default: () => d
//   });
//   var s = o(527);
//   function l() {
//       if (document.getElementById('react-mathquill-styles') == null) {
//           var m = document.createElement('style');
//           m.setAttribute('id', 'react-mathquill-styles'), m.innerHTML = s.Z[0][1], document.getElementsByTagName('head')[0].appendChild(m);
//       }
//   }
// })
function matchMathQuillStyleInjection(node: Node): boolean {
  return (
    node.type === 'FunctionDeclaration' &&
    node.body.body.some(
      (n) =>
        n.type === 'IfStatement' &&
        n.test.type === 'BinaryExpression' &&
        n.test.left.type === 'CallExpression' &&
        n.test.left.callee.type === 'MemberExpression' &&
        n.test.left.callee.object.type === 'Identifier' &&
        n.test.left.callee.object.name === 'document' &&
        n.test.left.callee.property.type === 'Identifier' &&
        n.test.left.callee.property.name === 'getElementById' &&
        n.test.left.arguments.length > 0 &&
        n.test.left.arguments[0].type === 'Literal' &&
        n.test.left.arguments[0].value === 'react-mathquill-styles' &&
        n.test.right.type === 'Literal' &&
        n.test.right.value === null
    )
  )
}

function getNoOpReplacement(identifier: string): Node {
  return {
    type: 'VariableDeclaration',
    declarations: [
      {
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: `NO_OPERATION_INSTEAD_OF_${identifier}`,
        },
        init: { type: 'Literal', value: null },
      },
    ],
    kind: 'const',
  }
}

function getNoOpFunctionBodyReplacement(identifier: string): Node {
  return {
    type: 'BlockStatement',
    body: [getNoOpReplacement(identifier)],
  } as Node
}

// Custom Rollup plugin to remove global style injection from the @editor
// package. This basically undos the cssInjectedByJsPlugin inside the editor
// package. The reason why we don't remove it from there, is because we want to
// keep the convenience of importing from the @serlo/editor package without
// having to worry about styling.
function removeGlobalStylesPlugin(): Plugin {
  return {
    name: 'remove-styles-plugin',
    generateBundle(_, bundle) {
      let globalStyleMatch = false
      let mathQuillStyleMatch = false

      for (const file of Object.values(bundle)) {
        if (file.type === 'chunk') {
          const chunk = file
          let ast = parseCodeToAST(chunk.code)

          const globalEditorStyleResult = removePattern(
            ast,
            matchGlobalStyleInjection,
            getNoOpReplacement('GLOBAL_EDITOR_STYLES')
          )

          globalStyleMatch =
            globalStyleMatch || globalEditorStyleResult.foundMatch
          ast = globalEditorStyleResult.ast
          const mathQuillStyleResult = removePattern(
            ast,
            matchMathQuillStyleInjection,
            getNoOpFunctionBodyReplacement('MATH_QUILL')
          )
          mathQuillStyleMatch =
            mathQuillStyleMatch || mathQuillStyleResult.foundMatch
          ast = mathQuillStyleResult.ast

          // Turn AST back into code and write it into the chunk.
          chunk.code = generateCodeFromAST(ast)
        }
      }

      if (!globalStyleMatch) {
        throw new Error(
          'No editor global style injection pattern was found and removed.'
        )
      }

      if (!mathQuillStyleMatch) {
        throw new Error(
          'No MathQuill style injection pattern was found and removed.'
        )
      }
    },
  }
}

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
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
    removeGlobalStylesPlugin(),
  ],
})
