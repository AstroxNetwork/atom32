module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['dist', './jest.config.js'],
  parser: '@typescript-eslint/parser',
  plugins: [],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',

    'arrow-parens': ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'jsx-quotes': [2, 'prefer-single'],
    semi: ['error', 'always'],
    'prefer-const': [
      2,
      {
        ignoreReadBeforeAssign: false,
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'no-undef': 'off',
    'no-prototype-builtins': 'off',
    'no-unused-vars': 'off',
  },
};
