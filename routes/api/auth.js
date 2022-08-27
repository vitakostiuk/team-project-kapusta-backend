const express = require("express");

const {auth} = require("../../controllers");

const {ctrlWrapper} = require("../../helpers");

const {validation, user} = require("../../middlewares");

const {registerSchema, loginSchema} = require('../../schemas');

const router = express.Router();

router.post('/register', validation(registerSchema), ctrlWrapper(auth.register));

router.post('/login', validation(loginSchema), ctrlWrapper(auth.login));

router.get('/google', ctrlWrapper(auth.googleAuth));

router.get('/google-redirect', ctrlWrapper(auth.googleRedirect));

router.get('/logout', user, ctrlWrapper(auth.logout));

module.exports = router;