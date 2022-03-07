module.exports = {
  preset: "jest-expo",
  testPathIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  setupFiles: ["<rootDir>/jestSetupFile.js"],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components",
  ],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.tsx", "!src/**/*.spec.tsx"],
  coverageReporters: ["lcov"],
};
