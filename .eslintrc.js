module.exports = {
  parser: "babel-eslint",
  env: {
    node: true
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error"
  }
};
