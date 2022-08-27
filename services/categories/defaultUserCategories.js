const {Category} = require('../../models');
const categories = require('../../db/categories.json');

const defaultUserCategories = async (id) => {
    const data = categories.map(item => ({ ...item, owner: id }));
    await Category.create(data);

}

module.exports = defaultUserCategories;