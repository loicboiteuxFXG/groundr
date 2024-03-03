"use strict";

const express = require('express');

const authController = require('../controllers/authController.js');
const { ValidateSignup } = require('../middleware/Validation.js');

const router = express.Router();

router.post('/login', authController.Login);

router.post('/register', ValidateSignup, authController.Register);


module.exports = router;