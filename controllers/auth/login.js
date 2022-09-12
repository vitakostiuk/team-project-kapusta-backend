const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {User} = require('../../models');
const {SECRET_KEY} = process.env;
const createError = require('../../helpers/createError');
const {loginSchema} = require('../../schemas')

const login = async(req, res) => {
    const {error} = loginSchema.validate(req.body);
    if (error) {
        throw createError(400, error.message)
    }
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw createError(401, 'Email or password is wrong');
    }

    if (!user.verify) {
        throw createError(401, 'Email is not verify');
    }

    const payload = {
        id: user._id
    };
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '12h'});
    const {createdAt, avatarURL} = user;
    await User.findByIdAndUpdate(user._id, {token})
    res.json({
        status: 'success',
        code: 200,
        token,
        user: {
            email,
            createdAt,
            avatarURL
        }
    })
}

module.exports = login;