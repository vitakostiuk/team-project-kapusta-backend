const express = require("express");

const {users} = require("../../controllers");

const {ctrlWrapper} = require("../../helpers");

const { user, upload, validation } = require("../../middlewares");

const {balanceSchema} = require('../../schemas');

const router = express.Router();

router.get('/current', user, ctrlWrapper(users.getCurrent));

router.patch('/avatars', user, upload.single('avatar'), ctrlWrapper(users.updateAvatar));

router.patch('/balance', user, validation(balanceSchema), ctrlWrapper(users.updateBalance));

router.get('/balance', user, ctrlWrapper(users.getBalance));


module.exports = router;