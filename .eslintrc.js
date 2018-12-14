module.exports = {
    env: {
        node: true
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: [
        "babel"
      ],
      parser: "babel-eslint",
    rules: {

        'no-unused-vars': 'warn',
        'no-console': 'warn',
        "babel/semi": 0,
        "strict": 0,
        'prettier/prettier': ['error', {
            singleQuote: true,
            trailingComma: 'all',
            jsxBracketSameLine: true,
        }],
    },
};