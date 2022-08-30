const Joi = require('joi');

const varificationSchema = Joi.object({
    email: Joi.string().email().required()
})

module.exports = varificationSchema;