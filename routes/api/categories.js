const express = require("express");

const {categories} = require("../../controllers");

const {ctrlWrapper} = require("../../helpers");

const {user} = require("../../middlewares");

// const {registerSchema, loginSchema} = require('../../schemas');

const router = express.Router();

router.post('/', user, ctrlWrapper(categories.add));

router.get('/', user, ctrlWrapper(categories.getAll));

module.exports = router;