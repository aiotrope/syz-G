/* eslint-env node */

module.exports = {
  env: { browser: true, es2020: true, 'cypress/globals': true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:cypress/recommended',
    'prettier',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'cypress'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'linebreak-style': ['error', 'unix'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-unused-vars': 'error',
    'react/prop-types': 0,
  },
  ignorePatterns: ['build/', 'dist/', 'server/', 'node_modules'],
}
