const { transactions: services } = require('../../services');

const getTransactionsDates = async (req, res, next) => {
    const {_id: userId} = req.user;

    const result = await services.getTransactionsDates({ userId });

    if (!result) {
        res.json({
            status: 'error',
            code: 404,
            message: 'Not found'
        })
    }

    res.json({
        status: 'success',
        code: 200,
        transactions: result,
    })
}

module.exports = getTransactionsDates;