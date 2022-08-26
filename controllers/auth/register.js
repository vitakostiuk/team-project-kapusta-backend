const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const createError = require('../../helpers/createError');
const { registerSchema } = require('../../schemas');


const register = async(req, res) => {
    const {error} = registerSchema.validate(req.body);
    if (error) {
        throw createError(400, error.message)
    }
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
        throw new Conflict('User with the same email address already exists')
    }
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({email, password: hashPassword, avatarURL});
    res.status(201).json({
        user: {
            email,
            avatarURL
        }
    });
}

module.exports = register;