/* eslint-disable import/no-commonjs */
module.exports = {
  extends: ['next'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.eslint.json'],
  },
  settings: {
    'import/internal-regex': '^@/',
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['tailwind.config.js', 'postcss.config.js', 'next.config.js'],
}
