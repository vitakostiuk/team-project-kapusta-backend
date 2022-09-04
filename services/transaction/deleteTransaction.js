const { Transaction, User } = require('../../models');
const { tryCatchWrapper } = require('../../helpers');

const deleteTransaction = tryCatchWrapper(async ({userId, transactionId}) => {
    let newBalance, calculatedValue;

    const transaction = await Transaction.findById(transactionId);

    const {balance} = await User.findById(userId);

    if (!transaction) {
        return null;
    }

    const { value, income } = transaction;

    if (income) {
        calculatedValue = balance - value;
        newBalance = calculatedValue.toFixed(2);
    } else {
        calculatedValue = balance + value;
        newBalance = calculatedValue.toFixed(2);
    }

    await User.findByIdAndUpdate(userId, { balance: newBalance }, { new: true });
    
    const data = await Transaction.findByIdAndRemove(transactionId);

    return data;
});

module.exports = deleteTransaction;