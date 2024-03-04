module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  //testMatch: ['**/tests/**/*.[jt]s?(x)'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  testPathIgnorePatterns: ['/node_modules/', '/dest/'], // Add this line to ignore the 'dest' directory
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  testTimeout: 30000,
  coverageThreshold: {
    global: {
      lines: 50,
    },
  },
};

