module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    'arrow-parens': ['warn', 'as-needed'],
    'no-confusing-arrow': ['warn'],
    'function-paren-newline': ['warn', 'consistent'],
    'arrow-body-style': ['warn', 'as-needed'],
    'implicit-arrow-linebreak': ['off']
  },
};
