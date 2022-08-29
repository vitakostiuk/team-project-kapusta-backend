const Joi = require('joi');

const addTransSchema = Joi.object({
    data: Joi.object({
        date: Joi.string(),
        month: Joi.string(),
        year: Joi.string()
    }),
    description: Joi.string().required(),
    categories: Joi.string(),
    value: Joi.number().required(),
    income: Joi.boolean().required()
})

module.exports = addTransSchema;