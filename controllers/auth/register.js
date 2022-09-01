const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const {createError, sendEmail} = require('../../helpers');
const { registerSchema } = require('../../schemas');
const { categories } = require('../../services');
const { v4 } = require('uuid');

const { BASE_URL } = process.env;

const register = async(req, res) => {
    const {error} = registerSchema.validate(req.body);
    if (error) {
        throw createError(400, error.message)
    }
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
        throw createError(409, 'User with the same email address already exists')
    }
    const verificationToken = v4();
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = new User({ email, password: hashPassword, avatarURL, verificationToken });
    await newUser.save();

    await categories.defaultUserCategories(newUser._id);
    
    const mail = {
        to: email,
        subject: "Mail confirmation",
        html: `<a target="_blank" href='${BASE_URL}/api/auth/verify/${verificationToken}'>Confirm email</a>`
    }

    await sendEmail(mail);

    res.status(201).json({
        status: 'success',
        code: 201,
        message: `A letter has been sent to this email address: ${email}. Please confirm the email`
    });
}

module.exports = register;