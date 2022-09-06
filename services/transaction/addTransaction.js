const { Transaction, User, Category } = require("../../models");
const { tryCatchWrapper } = require("../../helpers");

const addTransaction = tryCatchWrapper(async ({ _id, body, type }) => {
  const { balance } = await User.findById(_id);
  const { value, categories: idCategory } = body;

  const {title, type: typeCat} = await Category.findById(idCategory);

  let newBalance, income, calculatedValue, titleCat;
  const valueToNumber = Number(value);
  const floatValue = valueToNumber.toFixed(2);

  if (type === 'income' && typeCat === 'income') {
    calculatedValue = balance + Number(floatValue);
    newBalance = calculatedValue.toFixed(2);
    income = true;
    titleCat = title;
  } else if (type === 'expense' && typeCat === 'expenses') {
    calculatedValue = balance - Number(floatValue);
    newBalance = calculatedValue.toFixed(2);
    income = false;
    titleCat = title;
  } else {
    return;
  }

  if (newBalance < 0) {
    return null;
  }

  await User.findByIdAndUpdate(_id, { balance: newBalance }, { new: true });

  const transaction = await Transaction.create({
    ...body,
    categories: titleCat,
    value: floatValue,
    income,
    owner: _id,
  });

  return transaction;
});

module.exports = addTransaction;
