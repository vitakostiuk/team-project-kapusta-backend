const {Unauthorized} = require('http-errors');
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
        throw new Unauthorized('Email or password is wrong');
    }
    const payload = {
        id: user._id
    };
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '12h'});
    await User.findByIdAndUpdate(user._id, {token})
    res.json({
        token,
        user: {
            email
        }
    })
}

module.exports = login;