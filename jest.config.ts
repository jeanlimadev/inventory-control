export default {
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  moduleNameMapper: {
    '^#/(.*)$': '<rootDir>/tests/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/*.spec.ts'],
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  transform: { '.ts$': '@swc/jest' },
};
