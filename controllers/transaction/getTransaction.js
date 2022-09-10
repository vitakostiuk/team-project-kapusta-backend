const {transactions:services } = require('../../services');

const getTransaction = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { type } = req.params;
    const { day, month, year } = req.query;

    const result = await services.getTransaction({ userId, type, day, month, year });

    if (result.length === 0) {
        const message = `Sorry, but you don't have any transactions for the selected period: ${day}.${month}.${year}`;

        res.json({
            status: 'error',
            code: 404,
            message
        })
    }

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
    });
}

module.exports = getTransaction;