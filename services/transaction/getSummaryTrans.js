const { Transaction, User } = require("../../models");
const { tryCatchWrapper } = require('../../helpers');

const getSummaryTrans = tryCatchWrapper(async ({userId, type}) => {
    let income;

    if (type === 'income') {
        income = true;
    }
    else if(type === 'expenses'){
        income = false;
    }

    const {createdAt} = await User.findById(userId);
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

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
        let newMonth = 0;
        const result = [];

        for (let i = 0; i < (6 - transactions.length); i += 1){
            newMonth = month - i;

            result.push({month: newMonth, year, income, total: 0});
        }

        return result;
    }

    if (transactions.length < 6) {

        let newMonth = 0;
        const newTrans = [];

        console.log(transactions);

        const { month: maxMonth, year } = transactions.reduce((prev, cur) => cur.month > prev.month ? cur : prev);

        for (let i = 0; i < (6 - transactions.length); i += 1){
            newMonth = (maxMonth - transactions.length) - i;

            newTrans.push({month: newMonth, year, income, total: 0});
        }

        const result = [...transactions, ...newTrans];

        return result;

    }

    return transactions;
});

module.exports = getSummaryTrans;