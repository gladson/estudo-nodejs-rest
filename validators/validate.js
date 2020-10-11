const { check } = require('express-validator')

const validatePostAlien = () => {
    return [
        check('name').notEmpty().withMessage('Name not empty').isString().withMessage(' must be String'),
        check('tech').notEmpty().withMessage('Tech not empty').isString().withMessage(' must be String')
    ]
}

const validatePutAlien = () => {
    return [
        check('sub').isBoolean().withMessage('Sub not boolean'),
        check('name').notEmpty().withMessage('Name not empty').isString().withMessage(' must be String'),
        check('tech').notEmpty().withMessage('Tech not empty').isString().withMessage(' must be String')
    ]
}

const validatePatchAlien = () => {
    return [
        check('sub').isBoolean().withMessage('Sub not boolean')
    ]
}

const validator = {
    validatePostAlien : validatePostAlien,
    validatePutAlien: validatePutAlien,
    validatePatchAlien: validatePatchAlien
}

module.exports = validator