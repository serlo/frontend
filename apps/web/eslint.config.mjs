import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...compat.extends('@serlo/eslint-config/next.js'),
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: true,
      },
    },
    rules: {
      // Show an error for all direct imports from the Editor,
      // in order to prevent coupling of the codebases.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '@editor/*',
            // Make an exception for Editor package exports.
            '!@editor/package',
          ],
        },
      ],
    },
  },
]
