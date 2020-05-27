/* eslint-disable import/no-commonjs */
module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.eslint.json'],
  },
  plugins: ['@typescript-eslint', 'import', 'react-hooks'],
  rules: {
    // eslint
    'no-duplicate-imports': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // @typescript-eslint/eslint-plugin
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-extraneous-class': 'error',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-this-alias': 'warn',
    // TODO: `off` only for migration purposes, should be `error` in the future
    '@typescript-eslint/no-unsafe-assignment': 'off',
    // TODO: `off` only for migration purposes, should be `error` in the future
    '@typescript-eslint/no-unsafe-call': 'off',
    // TODO: `off` only for migration purposes, should be `error` in the future
    '@typescript-eslint/no-unsafe-member-access': 'off',
    // TODO: `off` only for migration purposes, should be `error` in the future
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        classes: false,
        functions: false,
        typedefs: false,
      },
    ],
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/prefer-ts-expect-error': 'error',

    // eslint-plugin-import
    'import/export': 'error',
    'import/extensions': ['error', 'never', { json: 'always' }],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-commonjs': 'error',
    'import/no-cycle': 'error',
    'import/no-default-export': 'error',
    'import/no-deprecated': 'error',
    'import/no-extraneous-dependencies': ['error'],
    'import/no-internal-modules': [
      'error',
      {
        allow: [
          '@fortawesome/fontawesome-svg-core/styles.css',
          'next/*',
          'public/_assets/**/*',
        ],
      },
    ],
    'import/no-mutable-exports': 'error',
    'import/no-self-import': 'error',
    'import/no-unassigned-import': 'error',
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true,
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: [
          ['builtin', 'external', 'internal'],
          ['parent', 'sibling', 'index', 'unknown'],
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: [],
        pathGroups: [{ pattern: '@/**', group: 'parent' }],
      },
    ],

    // eslint-plugin-react
    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-brace-presence': 'error',
    'react/jsx-fragments': ['error', 'syntax'],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',

    // eslint-plugin-react-hooks
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
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
}
