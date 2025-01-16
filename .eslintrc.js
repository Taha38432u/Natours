module.exports = {
  extends: [
    "airbnb", // Airbnb's base ESLint configuration
    "plugin:prettier/recommended", // Prettier integration to avoid formatting conflicts
  ],
  env: {
    browser: true, // For browser environment
    node: true, // For Node.js environment
    es6: true, // Enabling ES6 features
  },
  plugins: ["prettier"], // Prettier plugin for integration
  rules: {
    // You can add any custom rules here if you change your mind in the future
  },
};
