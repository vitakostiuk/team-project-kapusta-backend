const {User } = require("../../models");

const getBalance = async (req, res) => {
    const { _id } = req.user;
    const { balance} = await User.findById( _id );
    res.json(balance);
}

module.exports = getBalance;