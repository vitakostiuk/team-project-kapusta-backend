const { registerSchema, loginSchema } = require('./auth');
const { addTransSchema } = require('./transactions');

module.exports = {
    registerSchema,
    loginSchema,
    addTransSchema
}