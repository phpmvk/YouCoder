const config = {
  preset: 'ts-jest',
  // testEnvironment: 'node',
  verbose: true,
  testMatch:  [
    "**/src/__tests__/**/*+(spec|test).+(ts|tsx|js)",
  ],
};

module.exports = config;