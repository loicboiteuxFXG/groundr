'use strict'

const MongoUtils = require('../utils/MongoUtils');

const ValidateSignup = async (req, res, next) => {
    let userData = req.body;
    
    let today =  new Date();
    let birthDate = new Date(userData.DoB)
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    console.dir(userData)

    if (age < 18)
        return res.send({status: "error", message: "Age invalide"});
        
    if ((userData.password === "" || userData.password_confirm === "") || (userData.password != userData.password_confirm))
        return res.send({status: "error", message: "Les mots de passe ne correspondent pas"});

    if (userData.email === "")
    return res.send({status: "error", message: "L'email est manquante"});

    let user = await MongoUtils.GetUser({"email": userData.email});
    if (user != null) {
        if (Object.keys(user).length != 0)
            return res.send({status: "error", message: "Un utilisateur existe déja"});
    }

    next()
}



module.exports = { ValidateSignup }