"use strict";

const express = require('express');

const { isAuth, createMatchList } = require('../middleware')
const router = express.Router();

router.get('/get-matches', isAuth, createMatchList);



module.exports = router;