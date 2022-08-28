const {Transaction, User, Category} = require("../../models");
const { createError } = require('../../helpers');

const addTransaction = async (req, res) => {
    const { _id } = req.user;
    const { value, categories: idCategory} = req.body;
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
        }
    }

    const { title } = await Category.findById(idCategory);

    await User.findByIdAndUpdate(_id, { balance: newBalance }, { new: true });
    const result = await Transaction.create({ ...req.body,categories: title, income, owner: _id });
    res.json(result);
}

module.exports = addTransaction;