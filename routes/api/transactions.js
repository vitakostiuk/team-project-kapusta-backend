const express = require("express");

const {transactions} = require("../../controllers");

const {ctrlWrapper} = require("../../helpers");

const { validation, user } = require("../../middlewares");

const {addTransSchema} = require('../../schemas');

const router = express.Router();

router.get('/dates', user, ctrlWrapper(transactions.getTransactionsDates));

router.post('/:type', user, validation(addTransSchema), ctrlWrapper(transactions.addTransaction));

router.get('/:type', user, ctrlWrapper(transactions.getTransaction));

router.delete('/:transactionId', user, ctrlWrapper(transactions.deleteTransaction));

router.get('/', user, ctrlWrapper(transactions.fullReportTrans));

router.get('/reports/:type', user, ctrlWrapper(transactions.getSummaryTrans));

module.exports = router;