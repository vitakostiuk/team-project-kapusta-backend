const { Transaction, User } = require('../../models');
const { tryCatchWrapper } = require('../../helpers');

const deleteTransaction = tryCatchWrapper(async ({userId, transactionId}) => {
    let newBalance;

    const transaction = await Transaction.findById(transactionId);

    const {balance} = await User.findById(userId);

    if (!transaction) {
        return null;
    }

    const { value, income } = transaction;

    if (income) {
        newBalance = balance - value;
    } else {
        newBalance = balance + value;
    }

    await User.findByIdAndUpdate(userId, { balance: newBalance }, { new: true });
    
    const data = await Transaction.findByIdAndRemove(transactionId);

    return data;
});

module.exports = deleteTransaction;