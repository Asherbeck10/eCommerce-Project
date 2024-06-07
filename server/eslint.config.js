module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    rules: {
      indent: ['error', 2], // enforce consistent indentation
      'linebreak-style': ['error', 'unix'], // enforce consistent linebreak style
      quotes: ['error', 'single'], // enforce the consistent use of either backticks, double, or single quotes
      semi: ['error', 'always'], // require or disallow semicolons instead of ASI
      'no-unused-vars': ['error'], // disallow unused variables
      'no-console': 'off', // disallow the use of console
      eqeqeq: 'error', // require the use of === and !==
      curly: 'error', // enforce consistent brace style for all control statements
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Require explicit return and argument types on exported functions' and classes' public class methods
    },
  },
};
