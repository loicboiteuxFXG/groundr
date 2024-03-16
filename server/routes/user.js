'use strict';

const express = require('express');
const { GetUser } = require('../utils/MongoUtils');
const router = express.Router();

const { upload } = require('express-fileupload');

const { ValidateSignup } = require('../utils/Validation')

router.post('/create', (req, res) => {
    
    //console.info(ValidateSignup(req.body))
    // return
    MongoUtils.CreateUser(req.body)
        .then(user => {console.dir(user)})
        .catch(err => console.error(err));
});

router.get('/:id', (req, res) => {
    return res.send({})
})

module.exports = router;