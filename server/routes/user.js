'use strict';

const express = require('express');
const { GetUser, CreateUser} = require('../utils/MongoUtils');
const router = express.Router();

router.post('/create', (req, res) => {
    
    //console.info(ValidateSignup(req.body))
    // return
    CreateUser(req.body)
        .then(user => {console.dir(user)})
        .catch(err => console.error(err));
});

router.get('/get/:id', (req, res) => {
    return res.send({})
})

module.exports = router;