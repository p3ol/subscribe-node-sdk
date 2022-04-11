module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
  ],
  timers: 'real',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
