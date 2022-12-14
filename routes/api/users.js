const express = require("express");

const {users} = require("../../controllers");

const {ctrlWrapper} = require("../../helpers");

const { user, validation } = require("../../middlewares");

const {balanceSchema} = require('../../schemas');

const router = express.Router();

router.get('/current', user, ctrlWrapper(users.getCurrent));

router.patch('/balance', user, validation(balanceSchema), ctrlWrapper(users.updateBalance));

router.get('/balance', user, ctrlWrapper(users.getBalance));

router.patch('/avatars', user, ctrlWrapper(users.updateAvatar));


module.exports = router;