'use strict';

const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const interestController = require("../controllers/interestController");
const {isAuth, validation} = require("../middleware")
const {isAdmin} = require("../middleware/is-admin")

router.get('/users', isAuth, userController.getUsersForSidebar)

router.get('/users-admin', isAuth, isAdmin, userController.getUsersForAdmin)

router.post('/users-search', isAuth, userController.getResearchedUsers)

router.get('/get-user-token', isAuth, userController.GetUserToken)

router.post('/update-pfp', isAuth, userController.UpdatePfp)

router.post('/update', isAuth, validation.ValidateChanges, userController.UpdateUserData)

router.post('/update-password', isAuth, validation.ValidatePasswordChange, userController.UpdateUserPassword)

router.get('/get-interests', interestController.getInterests)

router.post('/set-location', isAuth, userController.setLocation)

router.post('/subscribe', isAuth, userController.UpdateUserPremium)

router.get('/check/:email', userController.checkIfExists)

router.post('/:id', isAuth, isAdmin, userController.blockUser)



module.exports = router;