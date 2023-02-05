const config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  "setupFiles": [
    "<rootDir>/src/tests/setupEnv.ts"
  ],
  "setupFilesAfterEnv": [
    "<rootDir>/src/tests/setup.ts"
  ],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  transform: {
    '^.+\\.[jt]s?$': 'ts-jest'
  },
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy"
  }
};

export default config;
