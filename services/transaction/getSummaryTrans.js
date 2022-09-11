const { Transaction} = require("../../models");
const { tryCatchWrapper } = require('../../helpers');

const getSummaryTrans = tryCatchWrapper(async ({userId, type}) => {
    let income;

    if (type === 'income') {
        income = true;
    }
    else if(type === 'expenses'){
        income = false;
    }

    const summary = [];

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
                month: {$toInt: '$_id.month'},
                year: {$toInt: '$_id.year'},
                income: '$_id.income',
                total: '$total',
                _id: 0
            },
        },
        {
            $sort: {
                month: -1
            }
        },
        {
            $limit: 6 
        }
    ]);

    if (transactions.length === 0) {
        return null;
    }

    transactions.forEach(el => {
        const monthName = new Date(2000, el.month - 1, 1).toLocaleDateString('en-US', { month: 'long' });
        summary.push({ monthName, ...el });
    });

    return summary;
});

module.exports = getSummaryTrans;