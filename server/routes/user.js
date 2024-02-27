'use strict';

const express = require('express');
const MongoUtils = require('../utils/MongoUtils');
const router = express.Router();

const { ValidateSignup } = require('../utils/Validation');


router.post('/create', ValidateSignup,(req, res) => {
    // console.info(ValidateSignup(req.body))
    // return
    console.log("back to route")
    

    MongoUtils.CreateUser(req.body)
        .then(user => {
            return res.send({status: "OK", message: "Compte créé"})
        })
        .catch(err => {
            console.error(err);
            res.send({status: "error", message: err})
        });
});

router.get('/:id', (req, res) => {
    console.log(req.params.id);
})


module.exports = router;