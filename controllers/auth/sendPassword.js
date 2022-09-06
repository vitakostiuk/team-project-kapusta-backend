const bcrypt = require('bcrypt');
const randomize = require('randomatic');
const { createError, sendEmail, sendPasswordTemplate } = require('../../helpers');

const { User } = require('../../models');

const { verificationSchema } = require('../../schemas');

const sendPassword = async (req, res) => {
  const { error } = verificationSchema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(400, 'Email is wrong');
  }
  const newPassword = randomize('Aa0)', 8);
  const hashPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
  await user.updateOne({ password: hashPassword });

  const mail = {
    to: email,
    subject: 'Forgot password on Kapusta',
    html: sendPasswordTemplate(newPassword),
  };

  await sendEmail(mail);

  res.status(200).json({
    message: `New password sent to ${email} email address`,
  });
};

module.exports = sendPassword;
