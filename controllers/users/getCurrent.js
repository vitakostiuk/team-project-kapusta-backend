const getCurrent = async(req, res) => {
    const {email, avatarURL} = req.user;
    res.json({
        status: 'success',
        code: 200,
        user: 
        {
            email,
            avatarURL
        }
    })
}

module.exports = getCurrent;