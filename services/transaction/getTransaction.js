const { tryCatchWrapper } = require('../../helpers');
const { Transaction } = require('../../models');

const getTransaction = tryCatchWrapper(async ({userId, type, day, month, year}) => {
    let income;
    // const nowDate = new Date();

    // const date = {
    //     day: String(nowDate.getDate()),
    //     month: String(nowDate.getMonth() + 1),
    //     year: String(nowDate.getFullYear())
    // }

    const date = {
        day,
        month,
        year
    }

    if (type === 'income') {
        income = true;
    }
    else if(type === 'expense'){
        income = false;
    }

    const transaction = await Transaction
        .find({ income: income, owner: userId, date: date })
        .sort({createdAt: -1});
    
    if (!transaction) {
        return null;
    }

    return transaction;
});

module.exports = getTransaction;