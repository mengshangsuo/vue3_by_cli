module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    ecmaVersion: 2020,
  },

  extends: [
    // "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "@vue/standard",
    "@vue/typescript/recommended",
  ],

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": 1,
    "no-tabs": 0,
    "comma-dangle": 0,
    "vue/multi-word-component-names": 0,
    quotes: 0,
    semi: 0,
    indent: 0,
  },

};
