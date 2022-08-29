const {transactions:services } = require('../../services');
const { createError } = require('../../helpers');

const addTransaction = async (req, res) => {
    const { _id } = req.user;
    const { type } = req.params;
    const body = req.body;
    
    const result = await services.addTransaction({ _id, body, type });

    if (result === undefined) {
        throw createError(404);
    }

    if (result === null) {
        const message = 'You cannot create a transaction that exceeds the balance';
        throw createError(409, message);
    }

    res.json({
        status: 'success',
        code: 200,
        transactions: result,
    });
}

module.exports = addTransaction;