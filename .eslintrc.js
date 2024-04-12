module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        quoteProps: 'consistent',
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
      },
    ],
    'react-native/no-inline-styles': 'off',
  },
};
