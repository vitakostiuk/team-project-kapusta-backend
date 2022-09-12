const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const createError = require('../../helpers/createError');

const {SECRET_KEY, FRONTEND_URL} = process.env;

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({verificationToken});
    
    if (!user) {
        throw createError(404);
    }

    const {email, createdAt} = user;

    const payload = {
        id: user._id
    };
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '12h'});

    await user.updateOne({token, verify: true, verificationToken: null});
    
    return res.redirect(`${FRONTEND_URL}?token=${token}&email=${email}&createdAt=${createdAt}`);
}

module.exports = verifyEmail;