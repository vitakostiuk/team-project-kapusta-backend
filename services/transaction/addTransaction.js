const { Transaction, User, Category } = require("../../models");
const { tryCatchWrapper } = require('../../helpers');

const addTransaction = tryCatchWrapper(async ({ _id, body, type }) => {
    const { balance } = await User.findById(_id);
    const { value, categories: idCategory } = body;

    let newBalance, income;
    const valueToNumber = Number(value);
    const floatValue = valueToNumber.toFixed(2);

    switch (type){
        case 'income':
            newBalance = balance + floatValue;
            income = true;
            break;
        case 'expense':
            newBalance = balance - floatValue;
            income = false;
            break;
        default:
            return;
    }

    if (newBalance < 0) {
        return null; 
    }

    const { title } = await Category.findById(idCategory);

    await User.findByIdAndUpdate(_id, { balance: newBalance.toFixed(2) }, { new: true });

    const transaction = await Transaction.create({ ...body, categories: title, value: floatValue, income, owner: _id });

    return transaction;
});

module.exports = addTransaction;