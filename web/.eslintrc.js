/* eslint-disable @typescript-eslint/no-var-requires */
const { join, resolve } = require("path")

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "graphql"],
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    node: true,
  },
  root: true,
  rules: {
    "graphql/template-strings": [
      "error",
      {
        env: "relay",
        tagName: "graphql",
        schemaJsonFilepath: resolve(
          join(__dirname, "src", "__generated__", "gatsby-introspection.json")
        ),
      },
    ],
  },
}
