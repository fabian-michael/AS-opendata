module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.(test|spec).ts'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svelte$': ['svelte-jester', { 'preprocess': true }]
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  bail: false,
  moduleNameMapper: {
    '^@([A-Z].*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js'
  ]
};