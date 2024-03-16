'use strict'

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/** Vérifie si la requête a un token JWT valide */

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).send({ error: 'Non authentifié..' });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_JWT);
  } catch (err) {
    err.statusCode = 401; 
    return res.status(err.statusCode).send({error: err});   // TODO Implémenter l'expiration du token
  }
  if (!decodedToken) {
    const error = new Error('Non authentifié.');
    error.statusCode = 401;
    return res.status(error.statusCode).send({ error: error });
  }

  // Passe le token décodé dans la requête pour pouvoir l'utiliser ailleurs
  req.user = decodedToken;
  next();
};
