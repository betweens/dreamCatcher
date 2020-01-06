module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-confusing-arrow": 0,
    "react/jsx-quotes": 0,
    "no-underscore-dangle": 0,
    "jsx-quotes": [
      2,
      "prefer-double"
    ],
    "react/prop-types": 0,
    "react/jsx-closing-bracket-location": 0,
    "import/no-extraneous-dependencies": 0,
    "max-len": ["error", {
      "ignoreTrailingComments": true,
      "code": 280
    }],
    "global-require": 0,
    "arrow-body-style": 0,
    "object-shorthand": 0,
    "no-useless-constructor": 0,
    "import/no-unresolved": 0,
    "no-undef": 0,
  },
};
