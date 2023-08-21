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
    'prettier',
    'plugin:@next/next/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.eslint.json'],
  },
  plugins: ['@typescript-eslint', 'import', 'react-hooks'],
  rules: {
    // eslint
    'no-duplicate-imports': 'error',
    'no-console': 'warn',
    'no-warning-comments': 'warn',
    eqeqeq: ['error', 'always'],

    // @typescript-eslint/eslint-plugin
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/no-extraneous-class': 'error',
    '@typescript-eslint/no-this-alias': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        classes: false,
        functions: false,
        typedefs: false,
        variables: false,
      },
    ],
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/restrict-template-expressions': 'error',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-unsafe-enum-comparison': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-redundant-type-constituents': 'off',

    // eslint-plugin-import
    'import/export': 'error',
    'import/extensions': [
      'error',
      'never',
      { css: 'always', svg: 'always', json: 'always' },
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-commonjs': 'error',
    'import/no-cycle': 'error',
    'import/no-default-export': 'error',
    'import/no-deprecated': 'error',
    'import/no-extraneous-dependencies': ['error'],
    'import/no-mutable-exports': 'error',
    'import/no-self-import': 'error',
    'import/no-unassigned-import': [
      'error',
      {
        allow: [
          '@/assets-webkit/fonts/**/*.css',
          '@/assets-webkit/styles/**/*.css',
        ],
      },
    ],
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

    // styledjsx exceptions
    'react/no-unknown-property': [
      2,
      {
        ignore: ['jsx', 'global'],
      },
    ],
  },
  settings: {
    'import/internal-regex': '^@/',
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.eslint.json',
      },
    },
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['src/pages/**/*'],
      rules: {
        'import/no-default-export': 'off',
        'react/display-name': 'off',
        '@typescript-eslint/require-await': 'off',
      },
    },
    {
      files: ['src/data/*/index.ts'],
      rules: {
        'import/newline-after-import': 'off',
        'import/order': 'off',
      },
    },
  ],
  ignorePatterns: [
    'tailwind.config.js',
    'shared/tailwind-base.cjs',
    'postcss.config.js',
    'next.config.js',
    'jest.config.mjs',
    'prettier.config.js',
  ],
  root: true,
}
