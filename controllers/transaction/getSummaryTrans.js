const {transactions:services } = require('../../services');
const { createError } = require('../../helpers');

const getSummaryTrans = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { type } = req.params;

    const result = await services.getSummaryTrans({ userId, type });

    if (!result) {
        throw createError(404);
    }

    res.json({
        status: 'success',
        code: 200,
        transactions: result,
    });
}

module.exports = getSummaryTrans;