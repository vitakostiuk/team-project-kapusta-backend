const { Category } = require('../../models');

const getAll = async (req, res, next) => {
    const { _id: id } = req.user;

    const data = await Category.find({ owner: id }, '_id title type owner');

    res.json({
        status: "success",
        code: 200,
        data
    });
}

module.exports = getAll;