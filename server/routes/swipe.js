"use strict";

const express = require('express');

const { isAuth, createMatchList, swipeUser } = require('../middleware')
const router = express.Router();

router.get('/get-matches', isAuth, createMatchList)

router.post('/ground', isAuth, swipeUser)


module.exports = router;