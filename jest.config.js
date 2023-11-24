const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const customJestConfig = {
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/(.*)$': '<rootDir>/src/$1',

    '^@/public/(.*)$': '<rootDir>/public/$1',

    '^__mocks__/(.*)$': '<rootDir>/__mocks__/$1',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    // './src/**/*.{js,jsx,ts,tsx}', // 모든 폴더 테스트
    './src/**/atoms/**/*.{js,jsx,ts,tsx}', // atoms 폴더만 테스트
    '!./src/**/_*.{js,jsx,ts,tsx}',
    '!./src/**/*.stories.{js,jsx,ts,tsx}',
    '!./src/**/*.styled.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30,
    },
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/src/styles/',
    '<rootDir>/src/components/(?!atoms/)', // components 중 atoms 폴더만 테스트'
    '<rootDir>/src/utils/', // utils 폴더 제외
  ],
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['<rootDir>/src/styles/'],
};

module.exports = createJestConfig(customJestConfig);
