'use strict'

const jwt = require('jsonwebtoken');
const sha256 = require('js-sha256').sha256;
const dotenv = require('dotenv');
dotenv.config();

const { GetUser, CreateUser } = require('../utils/MongoUtils');


const Login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(`Login requested for ${email}`)
    let loadedUser;

    GetUser({ email: email })
        .then(user => {
            console.dir(user);
            // Les méthodes findOne, findById ... peuvent retourner null
            // Il faut gérer le cas où user est null
            if (!user || user === null) {
                const error = new Error()
                error.statusCode = 404
                throw error
            }
            loadedUser = user;
            return sha256(password) === loadedUser.password;
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error()
                error.statusCode = 401
                throw error
            }
            // Création du token JWT
            const token = jwt.sign(
                {
                    _id: loadedUser._id,
                    email: loadedUser.email,
                    firstname: loadedUser.firstname,
                    lastname: loadedUser.lastname,
                    userId: loadedUser._id.toString()
                },
                // Utilise la clé secrète qui est dans le fichier .env
                process.env.SECRET_JWT,
                { expiresIn: '1h' }
            );
            res.status(200).json({ token: token });
        })
        .catch(err => {
            console.error("Login failed: " + err.message)
            if (!err.statusCode) err.statusCode = 500;
            res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
        });
}


const Register = (req, res) => {
    const userData = req.body
    console.log(`Register requested from ${userData.email}`)
    delete userData.password_confirm
    CreateUser(userData)
        .then(user => {
            return res.send({ status: "OK", message: "Compte créé" })
        })
        .catch(err => {
            console.error("Register failed: " + err.message)
            res.send({ status: "error", message: err })
        });
}


module.exports = { Login, Register };