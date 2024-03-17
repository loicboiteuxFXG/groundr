'use strict';

const express = require('express');
const { GetUser, CreateUser} = require('../utils/MongoUtils');
const router = express.Router();

const { upload } = require('express-fileupload');

const { ValidateSignup } = require('../utils/Validation')
const {isArray} = require("util");
const userController = require("../controllers/userController")
const {isAuth} = require("../middleware");

router.get('/get-user-token', isAuth, userController.GetUserToken)

router.get('/:id', (req, res) => {
    return res.send({})
})

module.exports = router;