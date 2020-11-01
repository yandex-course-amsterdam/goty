module.exports = {
  extends: ['airbnb-typescript-prettier', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id']
        }
      }
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id']
        }
      }
    ],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off'
  }
}
