'use strict';

const express = require('express');
const { GetUser, CreateUser, GetInterests} = require('../utils/MongoUtils');
const router = express.Router();


const { upload } = require('express-fileupload');

const {isArray} = require("util");
const userController = require("../controllers/userController")
const {isAuth} = require("../middleware")

router.get('/get-user-token', isAuth, userController.GetUserToken)

router.post('/update-pfp', isAuth, userController.UpdatePfp)

router.post('/update', isAuth, userController.UpdateUserData)

router.get('/get-interests', async (req, res) => {
    const interests = await GetInterests()
    res.send(interests);
})




module.exports = router;