const getCurrent = async(req, res) => {
    const {email, balance, avatarURL} = req.user;
    res.json({
        status: 'success',
        code: 200,
        user: 
        {
            email,
            balance,
            avatarURL
        }
    })
}

module.exports = getCurrent;