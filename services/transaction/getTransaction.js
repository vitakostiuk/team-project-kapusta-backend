const { tryCatchWrapper } = require('../../helpers');
const { Transaction } = require('../../models');

const getTransaction = tryCatchWrapper(async ({userId, type}) => {
    let income;

    if (type === 'income') {
        income = true;
    }
    else if(type === 'expense'){
        income = false;
    }

    const transaction = await Transaction.find({ income: income, owner: userId });
    
    if (!transaction) {
        return null;
    }

    return transaction;
});

module.exports = getTransaction;