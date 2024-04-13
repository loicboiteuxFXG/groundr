'use strict'

const express = require('express')
const router = express.Router()

const messageController = require('../controllers/messageController')
const {isAuth} = require("../middleware");

router.post('/send/:id', isAuth, messageController.sendMessage)

exports.router = router