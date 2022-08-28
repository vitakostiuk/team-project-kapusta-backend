const { Transaction, User } = require('../../models');
const { createError } = require('../../helpers');

const deleteTransaction = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { transactionId } = req.params;
    let newBalance;

    const transaction = await Transaction.findById(transactionId);

    const {balance} = await User.findById(userId);

    if (!transaction) {
        throw createError(404);
    }

    const { value, income } = transaction;

    if (income) {
        newBalance = balance - value;
    } else {
        newBalance = balance + value;
    }

    await User.findByIdAndUpdate(userId, { balance: newBalance }, { new: true });
    await Transaction.findByIdAndRemove(transactionId);

    res.status(200).json({
        message: 'Transaction deleted',
    });
}

module.exports = deleteTransaction;