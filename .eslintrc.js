module.exports = {
  extends: ['airbnb-typescript-prettier', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off'
  }
}
