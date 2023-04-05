module.exports = {
  env: {
    browser: true,

    es2021: true,

    node: true,
  },

  extends: [
    'eslint:recommended',

    'plugin:react/recommended',

    'plugin:prettier/recommended',

    'plugin:react/jsx-runtime',
  ],

  overrides: [],

  parserOptions: {
    ecmaVersion: 'latest',

    sourceType: 'module',

    ecmaFeatures: {
      jsx: 'true',
    },
  },

  plugins: ['react'],

  rules: {
    'no-unused-vars': 1,
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
};
