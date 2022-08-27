const {User} = require('../../models');

const { createError } = require('../../helpers');

const updateBalance = async (req, res) => {
    const { _id} = req.user;
    const result = await User.findByIdAndUpdate( _id, req.body, { new: true });
    if (!result) {
        throw createError(404);
    }
    res.json(result);
}

module.exports = updateBalance;