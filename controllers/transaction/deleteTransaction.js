const {transactions:services } = require('../../services');
const { createError } = require('../../helpers');

const deleteTransaction = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { transactionId } = req.params;

    const result = await services.deleteTransaction({ userId, transactionId });

    if (!result) {
        throw createError(404);
    }

    res.status(200).json({
        message: 'Transaction deleted',
    });
}

module.exports = deleteTransaction;