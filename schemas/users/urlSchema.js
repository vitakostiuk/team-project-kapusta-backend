const Joi = require('joi');

const urlSchema = Joi.object({
    avatarURL: Joi.string()
})

module.exports = urlSchema;