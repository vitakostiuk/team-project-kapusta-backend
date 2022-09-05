const {transactions:services } = require('../../services');
const { createError } = require('../../helpers');

const getTransaction = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { type } = req.params;
    const { day, month, year } = req.query;

    const result = await services.getTransaction({ userId, type, day, month, year });

    if (!result) {
        throw createError(404);
    }

    res.json({
        status: 'success',
        code: 200,
        transactions: result,
    });
}

module.exports = getTransaction;