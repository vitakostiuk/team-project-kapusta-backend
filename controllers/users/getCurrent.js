const getCurrent = async(req, res) => {
    const {email, avatarURL} = req.user;
    res.json({
        email,
        avatarURL
    })
}

module.exports = getCurrent;