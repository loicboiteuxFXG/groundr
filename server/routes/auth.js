"use strict";

const express = require('express');

const authController = require('../controllers/authController.js');
const { ValidateSignup } = require('../middleware/validation.js');
const isAuth = require('../middleware/is-auth.js');

const router = express.Router();

router.post('/login', authController.Login);

router.post('/register', ValidateSignup, authController.Register);

router.post('/check-token', isAuth);

module.exports = router;