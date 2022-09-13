const {User} = require('../../models');
const createError = require('../../helpers/createError');
const {urlSchema} = require('../../schemas')

const updateAvatar = async(req, res) => {
    const {error} = urlSchema.validate(req.body);
    if (error) {
        throw createError(400, error.message)
    }
    const {email} = req.user
    const {avatarURL} = req.body;
    await User.findOneAndUpdate({email}, {avatarURL});

    res.json({
        status: 'success',
        code: 200,
        user: {
            email,
            avatarURL
        }
    })
}

module.exports = updateAvatar;