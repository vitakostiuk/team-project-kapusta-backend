const { Transaction } = require("../../models");
const { tryCatchWrapper } = require('../../helpers');

const getSummaryTrans = tryCatchWrapper(async ({userId, type}) => {
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
        return null;
    }

    return transactions;
});

module.exports = getSummaryTrans;