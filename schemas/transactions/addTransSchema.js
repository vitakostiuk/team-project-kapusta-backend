const Joi = require('joi');

const customTransactionValidation = (value, helpers) => {
    if (typeof value !== 'number') return helpers.message("Value must be a number");

    if (value.toString().length >= 8) return helpers.message("Value length should not exceed 7 numbers");
    
    if (Math.sign(value) === -1) return helpers.message("Value must be positive");
    
    if (!Number.isInteger(value)) return helpers.message("Value must contain an integer");
}

const addTransSchema = Joi.object({
    date: Joi.object({
        day: Joi.string(),
        month: Joi.string(),
        year: Joi.string()
    }),
    description: Joi.string().required(),
    categories: Joi.string(),
    value: Joi.number().custom(customTransactionValidation, 'custom validation transaction').required(),
    income: Joi.boolean()
})

module.exports = addTransSchema;