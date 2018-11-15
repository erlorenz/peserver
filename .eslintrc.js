module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": ["eslint:recommended", "plugin:prettier/recommended" ],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        'prettier/prettier': ['error', {
          'singleQuote': true,
          'trailingComma': 'all',
          'jsxBracketSameLine': true,
        }],
        'no-unused-vars': 'warn',
        'no-console' : 'warn'
      },
};