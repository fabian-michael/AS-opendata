module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  env: {
    es6: true,
    browser: true
  },
  plugins: [
    "@typescript-eslint",
    "svelte3"
  ],
  extends: [
    "plugin:@typescript-eslint/recommended"
  ],
  overrides: [
    {
      files: ["**/*.svelte"],
      processor: "svelte3/svelte3"
    }
  ],
  rules: {
    quotes: ["warn", "single"],
    semi: ["error", "always"],
    eqeqeq: ["error", "always"]
  },
  settings: {
    "svelte3/ignore-styles": () => true
  }
}