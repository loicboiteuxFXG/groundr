'use strict'

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const { GetUser, CreateUser } = require('../utils/MongoUtils');


const Login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;
    GetUser({ email: email })
        .then(user => {
            console.dir(user);
            // Les méthodes findOne, findById ... peuvent retourner null
            // Il faut gérer le cas où user est null
            if (!user) {
                const error = new Error('Utilisateur non trouvée');
                error.statusCode = 404;
                return res.status(404).send(error);
            }
            loadedUser = user;
            console.log(loadedUser.password, password);

            return bcrypt.compare(password, loadedUser.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Mauvais mot de passe!');
                error.statusCode = 401;
                throw error;
            }
            // Création du token JWT
            const token = jwt.sign(
                {
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
            if (!err.statusCode) err.statusCode = 500;
            res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
        });
}


const Register = (req, res) => {
    const userData = req.body
    delete userData.password_confirm
    CreateUser(userData)
        .then(user => {
            return res.send({ status: "OK", message: "Compte créé" })
        })
        .catch(err => {
            console.error(err);
            res.send({ status: "error", message: err })
        });
}


module.exports = { Login, Register };