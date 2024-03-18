'use strict';

const express = require('express');
const router = express.Router();

const { GetUser, CreateUser, GetInterests} = require('../utils/MongoUtils');
const userController = require("../controllers/userController")
const {isAuth, validation} = require("../middleware")

router.get('/get-user-token', isAuth, userController.GetUserToken)

router.post('/update-pfp', isAuth, userController.UpdatePfp)

router.post('/update', isAuth, validation.ValidateChanges, userController.UpdateUserData)

router.post('/update-password', isAuth, validation.ValidatePasswordChange, userController.UpdateUserPassword)


router.get('/get-interests', async (req, res) => {
    const interests = await GetInterests()
    res.send(interests);
})




module.exports = router;