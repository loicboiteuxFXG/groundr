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

    if (!userData.firstName.trim()) {
        errors.firstName = 'Ce champ est requis.'
    } else if (!userData.firstName.trim().match(regExpString)) {
        errors.firstName = 'Le champ contient des caractères invalides.'
    }

    if (!userData.lastName.trim()) {
        errors.lastName = 'Ce champ est requis.'
    } else if (!userData.lastName.trim().match(regExpString)) {
        errors.lastName = 'Le champ contient des caractères invalides.'
    }

    if (!userData.email.trim()) {
        errors.email = 'Ce champ est requis.'
    } else if (!userData.email.trim().match(regExpEmail)) {
        errors.email = 'L\'adresse courriel est invalide.'
    }

    if (!userData.password.trim()) {
        errors.password = 'Ce champ est requis.'
    } else if (!userData.password.trim().match(regExpPassword)) {
        errors.password = 'Le mot de passe est invalide. Il doit contenir au moins 8' +
            ' caractères dont au moins une lettre minuscule, une lettre majuscule et un chiffre.'
    }

    if (!userData.password_confirm.trim()) {
        errors.password_confirm = 'Ce champ est requis.'
    } else if (!(userData.password_confirm.trim() === userData.password.trim())) {
        errors.password_confirm = 'Les mots de passe ne correspondent pas.'
    }

    if (!userData.DoB) {
        errors.DoB = 'Ce champ est requis.'
    }

    if (!userData.Bio.trim()){
        errors.password_confirm = 'Ce champ est requis.'
    }

    if (!userData.interests || userData.interests.length < 3) {
        errors.interests = 'Vous devez sélectionner au moins 3 intérêts.'
    }

    if (age < 18) {
        errors.DoB = "Vous devez avoir au moins 18 ans pour utiliser GroundR."
    }
        
    if (userData.password !== userData.password_confirm) {
        errors.password_confirm = "Les mots de passe ne correspondent pas."

    }

    let user = await GetUser({"email": userData.email})
    
    if (user != null) {
        if (Object.keys(user).length !== 0)
            errors.email = "Un utilisateur avec cette adresse courriel existe déjà."
    }

    if(Object.keys(errors).length !== 0)
        return res.status(400).send(errors)

    next()
}



module.exports = { ValidateSignup }