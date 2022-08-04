module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
  ],
  fakeTimers: {
    enableGlobally: false,
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  globals: {
    __API_URL__: 'http://localhost/api',
    __CLIENT_ID__: 'client-id',
    __CLIENT_SECRET__: 'client-secret',
  },
  transformIgnorePatterns: [],
};
