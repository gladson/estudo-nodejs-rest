const { check } = require('express-validator')

const validateAddAlien = () => {
    return [
        check('name').notEmpty().withMessage('Name not empty').isString().withMessage(' must be String'),
        check('tech').notEmpty().withMessage('Tech not empty').isString().withMessage(' must be String')
    ]
}

const validateChangeAlien = () => {
    return [
        check('sub').isBoolean().withMessage('Sub not boolean')
    ]
}

const validator = {
    validateAddAlien : validateAddAlien,
    validateChangeAlien: validateChangeAlien
}

module.exports = validator