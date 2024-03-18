'use strict';

const express = require('express');
const { GetUser, CreateUser} = require('../utils/MongoUtils');
const router = express.Router();


const { upload } = require('express-fileupload');

const {isArray} = require("util");
const userController = require("../controllers/userController")
const {isAuth} = require("../middleware")

router.get('/get-user-token', isAuth, userController.GetUserToken)

router.post('/update-pfp', isAuth, userController.UpdatePfp)

router.get('/get/:id', (req, res) => {
    return res.send({})
})

module.exports = router;