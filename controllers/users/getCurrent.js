const getCurrent = async(req, res) => {
    const {email, balance, createdAt} = req.user;
    res.json({
        status: 'success',
        code: 200,
        user: 
        {
            email,
            balance,
            createdAt
        }
    })
}

module.exports = getCurrent;