module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    'airbnb',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:react/recommended'
  ],
  plugins: ['babel', 'import', 'jsx-a11y', 'react', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'linebreak-style': 'off',

    'arrow-parens': 'off',
    'object-curly-newline': 'off',
    'no-mixed-operators': 'off',
    'function-paren-newline': 'off',
    'no-plusplus': 'off',
    'space-before-function-paren': 0,
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-underscore-dangle': ['error', { allow: ['id_', '_id'] }],
    'max-len': ['error', 100, 2, { ignoreUrls: true }],
    'no-console': 'off',
    'no-alert': 'error',

    'no-param-reassign': 'off',
    radix: 'off',

    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['jsx', '.js', '.jsx', '.tsx'] }],
    'react/button-has-type': 'off',
    'react/display-name': 'off',
    'prefer-destructuring': 'off',

    'jsx-a11y/anchor-is-valid': ['error', { components: ['Link'], specialLink: ['to'] }],

    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: [],
        labelAttributes: [],
        controlComponents: [],
        assert: 'either',
        depth: 3
      }
    ],

    'prettier/prettier': ['error']
  }
};
