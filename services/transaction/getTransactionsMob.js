const { tryCatchWrapper } = require('../../helpers');
const { Transaction } = require('../../models');

const getTransactionsMob = tryCatchWrapper(async ({userId, day, month, year}) => {

    const date = {
        day,
        month,
        year
    }

    const transaction = await Transaction
        .find({ owner: userId, date: date })
        .sort({ createdAt: -1 });
    
    
    if (!transaction) {
        return null;
    }

    return transaction;
});

module.exports = getTransactionsMob;