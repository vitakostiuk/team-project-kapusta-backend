const {transactions:services } = require('../../services');

const getTransactionsMob = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { day, month, year } = req.query;

    const result = await services.getTransactionsMob({ userId, day, month, year });

    if (result.length === 0) {
        const message = `Sorry, but you don't have any transactions for the selected period: ${day}.${month}.${year} 😿`;

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

module.exports = getTransactionsMob;