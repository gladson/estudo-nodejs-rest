const { check } = require("express-validator");

const validatePostAlien = () => [
    check("name")
        .notEmpty()
        .withMessage("Name not empty")
        .isString()
        .withMessage(" must be String"),
    check("tech")
        .notEmpty()
        .withMessage("Tech not empty")
        .isString()
        .withMessage(" must be String"),
];

const validatePutAlien = () => [
    check("sub").isBoolean().withMessage("Sub not boolean"),
    check("name")
        .notEmpty()
        .withMessage("Name not empty")
        .isString()
        .withMessage(" must be String"),
    check("tech")
        .notEmpty()
        .withMessage("Tech not empty")
        .isString()
        .withMessage(" must be String"),
];

const validatePatchAlien = () => [
    check("sub").isBoolean().withMessage("Sub not boolean"),
];

const validator = {
    validatePostAlien,
    validatePutAlien,
    validatePatchAlien,
};

module.exports = validator;
