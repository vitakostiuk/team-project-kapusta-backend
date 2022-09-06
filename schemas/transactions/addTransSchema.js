const Joi = require('joi');

const customDateValidation = (value, helpers) => {
    if (Number(value) > 31) return helpers.message("Day must be a valid");
}

const customMonthValidation = (value, helpers) => {
    if (Number(value) > 12) return helpers.message("Month must be a valid");
}

const customYearValidation = (value, helpers) => {
    if (value.length < 4 || value.length > 4) return helpers.message("Year must be a valid");
}

const customValueValidation = (value, helpers) => {
    if (typeof value !== 'number') return helpers.message("Value must be a number");

    if (value.toString().length >= 11) return helpers.message("Value length should not exceed 9 numbers");
    
    if (Math.sign(value) === -1) return helpers.message("Value must be positive");

    if (value === 0) return helpers.message("Value must be must greater than 0");
}

const customDescriptionValidation = (value, helpers) => {
    const regEx = /^[A-Za-z0-9а-яА-ЯёЁа-щА-ЩЬьЮюЯяЇїІіЄєҐґ'_ -]*$/;

    if(!regEx.test(value)) return helpers.message("Description must not contain special characters");
}

const addTransSchema = Joi.object({
    date: Joi.object({
        day: Joi.string().custom(customDateValidation, 'custom day validation'),
        month: Joi.string().custom(customMonthValidation, 'custom month validation'),
        year: Joi.string().custom(customYearValidation, 'custom month validation')
    }),
    description: Joi.string().min(3).max(51).custom(customDescriptionValidation).required(),
    categories: Joi.string().required(),
    value: Joi.number().custom(customValueValidation, 'custom value validation').required(),
    income: Joi.boolean()
})

module.exports = addTransSchema;