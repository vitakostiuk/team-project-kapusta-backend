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
            $project: {
                income: '$_id.income',
                categories: '$_id.categories',
                description: '$_id.description',
                value: '$_id.value'
            }
        },
        {
            $group: {
                _id: {
                    income: '$income',
                    categories: '$categories'
                },
                data: {
                    $push: {
                        description: '$description',
                        value: '$value',
                    }
                },
                summary: { $sum: '$value' }
            }
        },
        {
            $project: {
                _id: 0,
                categories: '$_id.categories',
                data: '$data',
                bool: '$_id.income',
                summary: '$summary'
            }
        },
        {
            $group: {
                _id: '$bool',
                reports: {
                    $push: '$$ROOT'
                },
                total: { $sum: '$summary' }
            }
        },
        {
            $project: {
                _id: 0,
                income: '$_id',
                reports: '$reports',
                total: '$total'
            }
        }
    ]);

    if (!transactions) {
        return null;
    }

    return transactions;
});

module.exports = fullReportTrans;