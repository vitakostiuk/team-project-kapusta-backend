const { Transaction } = require('../../models');
const { createError } = require('../../helpers');

const getTransaction = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { type } = req.params;

    let income;

    if (type === 'income') {
        income = true;
    }
    else if(type === 'expense'){
        income = false;
    }

    const result = await Transaction.find({income: income, owner: userId});

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