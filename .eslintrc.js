module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'ignorePatterns': ['api/PhoenixChannels.js'],
  'rules': {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'no-console': 'off',
    'global-require': 'off',
    'react/prop-types': 'off',
  },
  'globals': {
    "fetch": false,
  },
};
