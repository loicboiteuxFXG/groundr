'use strict'

const User = require('../models/user')
const throwError = require('../utils/errorHandler')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res, next) => {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            throwError(401, "L'authentification est nécessaire pour effectuer cette action.")
        }
        const token = authHeader.split(' ')[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.SECRET_JWT);
        } catch (err) {
            err.statusCode = 401;
            return res.status(err.statusCode).send({error: err});
        }
        if (!decodedToken) {
            throwError(401, "L'authentification est nécessaire pour effectuer cette action.")
        }

        const user = await User.findById(decodedToken._id).select("-password");

        if (!user) {
            throwError(404, "L'utilisateur n'existe pas.")
        }

        // Passe le token décodé dans la requête pour pouvoir l'utiliser ailleurs
        req.user = user
        req.token = decodedToken
        next()
}
