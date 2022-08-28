const {Transaction, User} = require("../../models");

const addTransaction = async (req, res) => {
    const { _id } = req.user;
    const { value, income } = req.body;
    const { balance } = await User.findById(_id);
    let newBalance;
    if (income) {
        newBalance = balance + value;
    }
    else { 
        newBalance = balance - value;
    }
    console.log(newBalance);
    await User.findByIdAndUpdate(_id, { balance: newBalance }, { new: true });
    const result = await Transaction.create({ ...req.body, owner: _id });
    res.json(result);
}

module.exports = addTransaction;