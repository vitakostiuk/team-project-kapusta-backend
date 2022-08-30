const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const googleAuth = require('./googleAuth');
const googleRedirect = require('./googleRedirect');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail');

module.exports = {
    register,
    login,
    logout,
    googleAuth,
    googleRedirect,
    verifyEmail,
    resendVerifyEmail
}