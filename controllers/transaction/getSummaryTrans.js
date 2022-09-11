const {transactions:services } = require('../../services');

const getSummaryTrans = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { type } = req.params;

    const result = await services.getSummaryTrans({ userId, type });

    if (!result) {
        res.json({
            status: 'error',
            code: 404,
            message: 'Summary is empty 👻',
        });
    }

    res.json({
        status: 'success',
        code: 200,
        transactions: result,
    });
}

module.exports = getSummaryTrans;