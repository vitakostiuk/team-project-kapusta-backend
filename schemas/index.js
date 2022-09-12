const { registerSchema, loginSchema, verificationSchema } = require('./auth');
const { addTransSchema } = require('./transactions');
const { balanceSchema, urlSchema } = require('./users');

module.exports = {
    registerSchema,
    loginSchema,
    verificationSchema,
    addTransSchema,
    balanceSchema,
    urlSchema
}