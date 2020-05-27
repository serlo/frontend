module.exports = {
  extends: ['./.eslintrc.js'],
  rules: {
    // eslint
    'no-warning-comments': 'warn',

    // @typescript-eslint/eslint-plugin
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
  },
}
