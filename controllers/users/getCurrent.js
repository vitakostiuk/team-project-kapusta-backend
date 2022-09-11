const getCurrent = async(req, res) => {
    const {email, balance, avatarURL, createdAt} = req.user;
    res.json({
        status: 'success',
        code: 200,
        user: 
        {
            email,
            balance,
            avatarURL,
            createdAt
        }
    })
}

module.exports = getCurrent;