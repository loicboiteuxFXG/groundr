'use strict';

const express = require('express');
const { GetUser } = require('../utils/MongoUtils');
const router = express.Router();

router.get('/:id', (req, res) => {
    return res.send({})
})

module.exports = router;