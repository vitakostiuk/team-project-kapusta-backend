const {transactions:services } = require('../../services');

const addTransaction = async (req, res) => {
    const { _id } = req.user;
    const { type } = req.params;
    const body = req.body;
    
    const result = await services.addTransaction({ _id, body, type });

    if (result === undefined) {
        res.json({
            status: 'error',
            code: 404,
            message: 'Not found'
        })
    }

    if (result === null) {
        const message = 'You cannot create a transaction that exceeds the balance';

        res.json({
            status: 'error',
            code: 409,
            message
        })
    }

    res.json({
        status: 'success',
        code: 200,
        transactions: result,
    });
}

module.exports = addTransaction;