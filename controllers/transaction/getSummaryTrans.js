const {Transaction} = require("../../models");
const { createError } = require('../../helpers');

const getSummaryTrans = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { type } = req.params;

    let income;

    if (type === 'income') {
        income = true;
    }
    else if(type === 'expense'){
        income = false;
    }

    const transactions = await Transaction.aggregate([
        {
            $match: {
                owner: userId,
                income: income
            },
        },
        {
            $group: {
                _id: {
                    month: '$date.month',
                    year: '$date.year',
                    income: '$income'
                },
                total: { $sum: '$value'},
            },
        },
        {
            $project: {
                _id: 1,
                income: 1,
                total: 1
            },
        },
        {
            $sort: {
                'date.month': 1
            }
        }
    ]);

    if (!transactions) {
        throw createError(404);
    }
    
    res.json({
        status: 'success',
        code: 200,
        transactions,
    });
}

module.exports = getSummaryTrans;