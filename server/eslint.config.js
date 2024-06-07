module.exports = {
  languageOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': ['error'],
    'no-console': 'off',
    eqeqeq: 'error',
    curly: 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
