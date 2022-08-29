const { Transaction } = require("../../models");
const { tryCatchWrapper } = require('../../helpers');

const fullReportTrans = tryCatchWrapper(async ({userId, month, year}) => {
    
    const transactions = await Transaction.aggregate([
        {
            $match: {
                owner: userId,
                'date.month': month,
                'date.year': year
            },
        },
        {
            $group: {
                _id: {
                    income: '$income',
                    categories: '$categories',
                    description: '$description',
                    value: '$value'
                },
            }
        },
        {
            $group: {
                _id: '$_id.categories',
                data: {
                    $push: {
                        type: '$_id.income',
                        description: '$_id.description',
                        value: '$_id.value',
                    }
                },
                summary: { $sum: '$_id.value' }
            }
        },
        {
            $group: {
                _id: { $first: '$data.type' },
                reports: {
                    $push: '$$ROOT'
                },
                total: { $sum: '$summary' }
            }
        },
        {
            $project: {
                _id: {
                    income: '$_id',
                },
                reports: 1,
                total: 1
            },
        }
    ]);

    if (!transactions) {
        return null;
    }

    return transactions;
});

module.exports = fullReportTrans;