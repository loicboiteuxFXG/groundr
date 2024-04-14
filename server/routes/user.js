'use strict';

const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const interestController = require("../controllers/interestController");
const {isAuth, validation} = require("../middleware")

router.get('/users', isAuth, userController.getUsersForSidebar)

router.get('/get-user-token', isAuth, userController.GetUserToken)

router.patch('/update-pfp', isAuth, userController.UpdatePfp)

router.patch('/update', isAuth, validation.ValidateChanges, userController.UpdateUserData)

router.patch('/update-password', isAuth, validation.ValidatePasswordChange, userController.UpdateUserPassword)

router.get('/get-interests', interestController.getInterests)

router.patch('/subscribe', isAuth, userController.UpdateUserPremium);



module.exports = router;