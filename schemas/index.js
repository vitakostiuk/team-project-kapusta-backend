const { registerSchema, loginSchema, verificationSchema } = require('./auth');
const { addTransSchema } = require('./transactions');

module.exports = {
    registerSchema,
    loginSchema,
    verificationSchema,
    addTransSchema
}