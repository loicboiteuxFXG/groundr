'use strict'

const jwt = require('jsonwebtoken');


const { GetUser, CreateUser } = require('../utils/MongoUtils')


const Login = (req, res, next) => {
    console.dir(req.body);
    return res.send({ status: "aaaaa", message: "Connexion" });

    const email = req.body.email;
    const password = req.body.password;

    GetUser({ email: email })
        .then(user => {
            console.dir(user);
        });
}


const Register = (req, res) => {
    // console.info(ValidateSignup(req.body))
    // return
    console.log("back to route")


    CreateUser(req.body)
        .then(user => {
            return res.send({ status: "OK", message: "Compte créé" })
        })
        .catch(err => {
            console.error(err);
            res.send({ status: "error", message: err })
        });
}


module.exports = { Login, Register }