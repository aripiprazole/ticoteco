module.exports = {
  env: {
    browser: true,
    es2021: true,
    mocha: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'google',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/prop-types': ['off'],
    'require-jsdoc': ['off'],
    'spaced-comment': ['off'],
  },
};
