const { Category } = require('../../models');

const add = async (req, res, next) => {
    const { _id: id } = req.user;
    const body = req.body;

    const data = await Category.create({...body, owner: id});

    res.json({
        status: "success",
        code: 201,
        data
    });
}

module.exports = add;