const Joi = require('joi');

const addTransSchema = Joi.object({
    date: Joi.object({
        day: Joi.string(),
        month: Joi.string(),
        year: Joi.string()
    }),
    description: Joi.string().required(),
    categories: Joi.string(),
    value: Joi.number().required(),
    income: Joi.boolean()
})

module.exports = addTransSchema;