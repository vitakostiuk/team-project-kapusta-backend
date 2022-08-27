const {Transaction, User} = require("../../models");

const addExpense = async (req, res) => {
    const { _id } = req.user;
    const { value } = req.body;
    const { balance} = await User.findById( _id );
    const newBalance = balance - value;
    await User.findByIdAndUpdate(_id, { balance: newBalance }, { new: true });
    const result = await Transaction.create({ ...req.body, income: false, owner: _id });
    res.json(result);
}

module.exports = addExpense;