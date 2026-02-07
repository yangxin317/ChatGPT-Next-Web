/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.scss$": "<rootDir>/tests/__mocks__/styleMock.js",
  },
  transformIgnorePatterns: ["/node_modules/(?!openai)"],
};
