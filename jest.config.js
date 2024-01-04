/* eslint-disable @typescript-eslint/no-var-requires */
// const { defaults: tsjPreset } = require('ts-jest/presets');
const { defaults } = require('jest-config');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testMatch: ['<rootDir>/**/tests/**/*.test.{ts,tsx,js,jsx}'],
  transformIgnorePatterns: ['<rootDir>/node_modules/@wizz-js/', '<rootDir>/node_modules/.pnpm/'],
  collectCoverage: false,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  moduleDirectories: [...defaults.moduleDirectories],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testEnvironment: 'node',
  testTimeout: 600000,
};
