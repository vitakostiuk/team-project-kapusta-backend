const express = require("express");

const {auth} = require("../../controllers");

const {ctrlWrapper} = require("../../helpers");

const {user} = require("../../middlewares");

const router = express.Router();

router.post('/register', ctrlWrapper(auth.register));

router.post('/login', ctrlWrapper(auth.login));

router.get('/google', ctrlWrapper(auth.googleAuth));

router.get('/google-redirect', ctrlWrapper(auth.googleRedirect));

router.get('/logout', user, ctrlWrapper(auth.logout));

router.get('/verify/:verificationToken', ctrlWrapper(auth.verifyEmail));

router.get('/verify', ctrlWrapper(auth.resendVerifyEmail));

router.patch('/forgot-password', ctrlWrapper(auth.sendPassword));

module.exports = router;