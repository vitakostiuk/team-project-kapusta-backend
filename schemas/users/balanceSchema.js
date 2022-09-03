const Joi = require('joi');

const customBalanceValidation = (value, helpers) => {
    if (typeof value !== 'number') return helpers.message("Balance must be a number");

    if (value.toString().length >= 8) return helpers.message("Balance length should not exceed 7 numbers");
    
    if (Math.sign(value) === -1) return helpers.message("Balance must be positive");
    
    if (!Number.isInteger(value)) return helpers.message("Balance must contain an integer");
}

const balanceSchema = Joi.object({
    balance: Joi.number().custom(customBalanceValidation, 'custom validation balance'),
})

module.exports = balanceSchema;