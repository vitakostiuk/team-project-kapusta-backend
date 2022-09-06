const { User } = require('../../models');
const { verificationSchema } = require('../../schemas');
const { createError, sendEmail, sendEmailTemplate } = require('../../helpers');

const resendVerifyEmail = async (req, res) => {
    const {email} = req.body;
    const {error} = verificationSchema.validate({email});
    if (error) {
        throw createError(400, error.message)
    }

    const user = await User.findOne({email});
    if (!user) {
        throw createError(404);
    }
    if (user.verify) {
        throw createError(400, 'Verification has already been passed')
    }

    const mail = {
        to: email,
        subject: "Welcome to Kapusta",
        html: sendEmailTemplate(user.verificationToken),
    }

    await sendEmail(mail);

    res.json({
        message: 'Verification email sent'
    })
}

module.exports = resendVerifyEmail;