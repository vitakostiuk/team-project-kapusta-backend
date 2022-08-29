const {transactions:services } = require('../../services');
const { createError } = require('../../helpers');


const fullReportTrans = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { month, year } = req.query;
    
    const result = await services.fullReportTrans({ userId, month, year });

    if (!result) {
        throw createError(404);
    }

    res.json({
        status: 'success',
        code: 200,
        transactions: result,
    });

}

module.exports = fullReportTrans;