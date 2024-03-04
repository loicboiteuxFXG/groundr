'use strict'

const {GetUser} = require('../utils/MongoUtils');

const ValidateSignup = async (req, res, next) => {
    const errors = {}

    let userData = req.body;
    
    let today =  new Date();
    let birthDate = new Date(userData.DoB)
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18) {
        errors.DoB = "Vous devez avoir au moins 18 ans pour utiliser GroundR."
        // return res.send({status: "error", message: "Age invalide"});
    }
        
    if (userData.password !== userData.password_confirm) {
        errors.password_confirm = "Les mots de passe ne correspondent pas."
        // return res.send({status: "error", message: "Les mots de passe ne correspondent pas"});
    }

    let user = await GetUser({"email": userData.email});
    
    if (user != null) {
        if (Object.keys(user).length !== 0)
            errors.email = "Un utilisateur avec cette adresse courriel existe déjà."
            // return res.send({status: "error", message: "Un utilisateur existe déja"});
    }

    next()
}



module.exports = { ValidateSignup }