'use strict';

const express = require('express');
const MongoUtils = require('../utils/MongoUtils');
const router = express.Router();

const { ValidateSignup } = require('../middleware/Validation');


router.post('/create', ValidateSignup,(req, res) => {
    
});

router.get('/:id', (req, res) => {
    console.log(req.params.id);
})


module.exports = router;