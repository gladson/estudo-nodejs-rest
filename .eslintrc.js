module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: ["airbnb-base"],
    plugins: ["import"],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        "no-console": "off",
        "no-unused-vars": "off",
        "max-len": "off",
    },
};
