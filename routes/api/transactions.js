const express = require("express");

const {transactions} = require("../../controllers");

const {ctrlWrapper} = require("../../helpers");

const {user} = require("../../middlewares");

const router = express.Router();

router.post('/:UserId', user, ctrlWrapper(transactions.addTransaction));

module.exports = router;