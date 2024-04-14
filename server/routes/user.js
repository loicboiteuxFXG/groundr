'use strict';

const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const interestController = require("../controllers/interestController");
const {isAuth, validation} = require("../middleware")

router.get('/get-user-token', isAuth, userController.GetUserToken)

router.post('/update-pfp', isAuth, userController.UpdatePfp)

router.post('/update', isAuth, validation.ValidateChanges, userController.UpdateUserData)

router.post('/update-password', isAuth, validation.ValidatePasswordChange, userController.UpdateUserPassword)

router.get('/get-interests', interestController.getInterests)

router.patch('/set-location', isAuth, userController.setLocation)



module.exports = router;