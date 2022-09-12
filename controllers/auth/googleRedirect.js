const queryString = require("query-string");
const axios = require("axios");
const jwt = require('jsonwebtoken');

const {User} = require('../../models');
const { categories } = require('../../services');
const { SECRET_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL, FRONTEND_URL } = process.env;

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  let token;

  const { code } = urlParams;
    const tokenData = await axios({
      url: "https://oauth2.googleapis.com/token",
      method: "post",
      data: {
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
        grant_type: "authorization_code",
        code,
      },
    });

  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
        Authorization: `Bearer ${tokenData.data.access_token}`
    }
  });

  const {email, picture: avatarURL} = userData.data;

  const user = await User.findOne({email});

  if (user) {
    const payload = {
      id: user._id
  };
  token = jwt.sign(payload, SECRET_KEY, {expiresIn: '12h'});
  await user.updateOne({token, avatarURL});
  } else {
    const newUser = await User.create({email, avatarURL})
    await categories.defaultUserCategories(newUser._id);
    const payload = {
      id: newUser._id
    };
    token = jwt.sign(payload, SECRET_KEY, {expiresIn: '12h'});
    await newUser.updateOne({token});
  }


return res.redirect(`${FRONTEND_URL}?token=${token}&email=${email}&avatarURL=${avatarURL}`);
};

module.exports = googleRedirect;
