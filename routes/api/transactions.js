const express = require("express");

const {transactions} = require("../../controllers");

const {ctrlWrapper} = require("../../helpers");

const {user} = require("../../middlewares");

const router = express.Router();

router.post('/:type', user, ctrlWrapper(transactions.addTransaction));

router.get('/:type', user, ctrlWrapper(transactions.getTransaction));

router.delete('/:transactionId', user, ctrlWrapper(transactions.deleteTransaction));

router.get('/reports/:type', user, ctrlWrapper(transactions.getSummaryTrans));

module.exports = router;