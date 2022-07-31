module.exports = {
  env: {
    browser: true,
    es2021: true,
    mocha: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'google'],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error', {}, {usePrettierrc: true}],
    'react/prop-types': ['off'],
    'require-jsdoc': ['off'],
    'spaced-comment': ['off'],
    'indent': ['off'],
    'quotes': ['off'],
    'operator-linebreak': [
      'error',
      'after',
      {overrides: {'?': 'before', ':': 'before'}},
    ],
  },
};
