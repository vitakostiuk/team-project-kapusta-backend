const {Transaction, User} = require("../../models");
const { createError } = require('../../helpers');

const addTransaction = async (req, res) => {
    const { _id } = req.user;
    const { value} = req.body;
    const { type } = req.params;
    const { balance } = await User.findById(_id);
    let newBalance, income;
    if (type === 'income') {
        newBalance = balance + value;
        income = true;
    }
    else {
        if (type === 'expense') {
        newBalance = balance - value;
        income = false;
    }
        else { 
        throw createError(404);
    }}
    await User.findByIdAndUpdate(_id, { balance: newBalance }, { new: true });
    const result = await Transaction.create({ ...req.body,income, owner: _id });
    res.json(result);
}

module.exports = addTransaction;