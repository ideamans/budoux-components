/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/tests/vue/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        esModuleInterop: true,
      },
    }],
  },
  setupFiles: ['<rootDir>/tests/jest.setup.js'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
};