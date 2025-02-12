module.exports = {
  preset: 'react-app',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)',
  ],
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'jsdom',
  globals: {
    'babel-jest': {
      useESModules: true,
    },
  },
};
