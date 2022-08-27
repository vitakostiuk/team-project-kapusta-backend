const express = require("express");

const {transactions} = require("../../controllers");

const {ctrlWrapper} = require("../../helpers");

const {user} = require("../../middlewares");

const router = express.Router();

router.get('/:UserId', user, ctrlWrapper(transactions.getBalance));

router.post('/:UserId/expense', user, ctrlWrapper(transactions.addExpense));

module.exports = router;