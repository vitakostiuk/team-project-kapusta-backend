const Joi = require('joi');

const verificationSchema = Joi.object({
    email: Joi.string().regex(/^[^-\W][\w.-]+@\w+\.\w+$/).email().min(10).max(63).required().messages({
        "string.base": "Sorry! It looks like something went wrong. Please try later.",
        "string.pattern.base": "Please fill a valid email address",
        "string.empty": "Email is not allowed to be empty",
        "string.min": "Email length must be at least 10 characters long",
        "string.email": "Please fill a valid email address"
    }),
})

module.exports = verificationSchema;