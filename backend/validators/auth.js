const { check } = require('express-validator')

exports.userSignupValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
    check('email')
    .isEmail()
    .withMessage('Must be a valid Email address'),
    check('password')
    .isLength({min:6})
    .withMessage('Password must contain atleast 6 characters')
]

exports.userSigninValidator = [
    check('email')
    .isEmail()
    .withMessage('Must be a valid Email address'),
    check('password')
    .isLength({min:6})
    .withMessage('Password must contain atleast 6 characters')
]