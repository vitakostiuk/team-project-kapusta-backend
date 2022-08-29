const express = require("express");

const {categories} = require("../../controllers");

const {ctrlWrapper} = require("../../helpers");

const {user} = require("../../middlewares");

const router = express.Router();

router.get('/', user, ctrlWrapper(categories.getAll));

module.exports = router;