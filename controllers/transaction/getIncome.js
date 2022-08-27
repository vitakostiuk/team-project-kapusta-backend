const { Transaction } = require('../../models');

const getIncome = async (req, res, next) => {
    const { _id: id } = req.user;

    const result = await Transaction.find({
        expenses: false,
        owner: id,
    });

    if (!result) {
        return res.status(404).json({
            message: "Not found income transactions",
        });
    }

    res.json({
        status: 'success',
        code: 200,
        transactions: result,
    });
}

module.exports = getIncome;