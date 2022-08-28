const {Transaction} = require("../../models");
const { createError } = require('../../helpers');


const fullReportTrans = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { month, year } = req.query;
    
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
                summary: {$sum: '$_id.value'}
            }
        },
        {
            $group: {
                _id: {$first: '$data.type'},
                reports: {
                    $push: '$$ROOT'
                },
                total: {$sum: '$summary'}
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
        throw createError;
    }

    res.json({
        status: 'success',
        code: 200,
        transactions,
    });

}

module.exports = fullReportTrans;