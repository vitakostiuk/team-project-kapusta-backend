const Joi = require('joi');

const customBalanceValidation = (value, helpers) => {
    if (typeof value !== 'number') return helpers.message("Balance must be a number");
    
    if (Math.sign(value) === -1) return helpers.message("Balance must be positive");

    if (value === 0) return helpers.message("Balance must be must greater than 0");

    if(value.toString().length === 1) return helpers.message("Balance must be greater than 1 symbol");
}

const balanceSchema = Joi.object({
    balance: Joi.number().custom(customBalanceValidation, 'custom validation balance'),
})

module.exports = balanceSchema;