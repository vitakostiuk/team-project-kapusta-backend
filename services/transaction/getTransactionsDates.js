const { Transaction } = require('../../models');
const { tryCatchWrapper } = require('../../helpers');

const getTransactionsDates = tryCatchWrapper(async ({ userId }) => {

    const dates = await Transaction.aggregate([
        {
            $match: {
                owner: userId,
            },
        },
        {
            $group: {
                _id: {
                    day: '$date.day',
                    month: '$date.month',
                    year: '$date.year',
                    income: '$income'
                },
            },
        },
        {
            $project: {
                day: '$_id.day',
                month: '$_id.month',
                year: '$_id.year',
                income: '$_id.income',
                _id: 0
            },
        },
        {
            $group: {
                _id: {
                    income: '$income',
                },
                data: {
                    $push: {
                        day: '$day',
                        month: '$month',
                        year: '$year'
                    }
                },
            }
        },
        {
            $project: {
                _id: 0,
                income: '$_id.income',
                data: '$data',
            }
        },
    ]);

    if (!dates) {
        return null;
    }

    return dates;
})

module.exports = getTransactionsDates;