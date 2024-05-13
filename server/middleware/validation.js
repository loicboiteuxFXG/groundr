'use strict';

const User = require("../models/user")
const bcrypt = require('bcrypt')

const regExpString = '^[\'\"\-\$A-Za-zÀ-ÿ\ ]+$';
const regExpEmail = '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
const regExpPassword = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'

const ValidateSignup = async (req, res, next) => {
    const errors = {};

    let userData = req.body;

    let today = new Date();
    let birthDate = new Date(userData.DoB);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (!userData.firstName.trim()) {
        errors.firstName = 'Ce champ est requis.';
    } else if (!userData.firstName.trim().match(regExpString)) {
        errors.firstName = 'Le champ contient des caractères invalides.';
    }

    if (!userData.lastName.trim()) {
        errors.lastName = 'Ce champ est requis.';
    } else if (!userData.lastName.trim().match(regExpString)) {
        errors.lastName = 'Le champ contient des caractères invalides.';
    }

    if (!userData.email.trim()) {
        errors.email = 'Ce champ est requis.';
    } else if (!userData.email.trim().match(regExpEmail)) {
        errors.email = 'L\'adresse courriel est invalide.';
    }

    if (!userData.password.trim()) {
        errors.password = 'Ce champ est requis.'
    } else if (!userData.password.trim().match(regExpPassword)) {
        errors.password = 'Le mot de passe est invalide. Il doit contenir au moins 8' +
            ' caractères dont au moins une lettre minuscule, une lettre majuscule et un chiffre.'
    }

    if (!userData.password_confirm.trim()) {
        errors.password_confirm = 'Ce champ est requis.'
    }

    if (!userData.DoB) {
        errors.DoB = 'Ce champ est requis.';
    }

    if (!userData.bio.trim()) {
        errors.bio = 'Ce champ est requis.';
    } else if (!userData.bio.match(regExpString)) {
        errors.bio = 'La bio contient des données invalides';
    }

    if (!userData.interests || userData.interests.length < 3) {
        errors.interests = 'Vous devez sélectionner au moins 3 intérêts.';
    }

    if (age < 18) {
        errors.DoB = "Vous devez avoir au moins 18 ans pour utiliser GroundR.";
    }

    if (userData.password !== userData.password_confirm) {
        errors.password_confirm = "Les mots de passe ne correspondent pas.";
    }

    let user = await User.findOne({ email: userData.email });

    if (user != null) {
        if (Object.keys(user).length !== 0)
            errors.email = "Un utilisateur avec cette adresse courriel existe déjà.";
    }

    const salt = await bcrypt.genSalt(10)
    userData.password = await bcrypt.hash(userData.password, salt)
    delete userData.password_confirm

    if (Object.keys(errors).length !== 0)
        return res.status(400).send(errors);

    next();
};

const ValidateChanges = async (req, res, next) => {
    const errors = {};

    let userData = req.body;

    if (!userData.bio.trim()) {
        errors.bio = 'Ce champ est requis.';
    } else if (!userData.bio.match(regExpString)) {
        errors.bio = 'La bio contient des données invalides';
    }

    if (!userData.interests || userData.interests.length < 3) {
        errors.interests = 'Vous devez sélectionner au moins 3 intérêts.';
    }

    if (Object.keys(errors).length !== 0)
        return res.status(400).send(errors);

    next();
};

const ValidatePasswordChange = async (req, res, next) => {
    const errors = {};

    let passwords = req.body;

    const user = await User.findOne({_id: req.user._id})

    if (!bcrypt.compare(passwords.password_previous, user.password)) {
        errors.password_previous = "L'ancien mot de passe est incorrect.";
    }

    if (!(passwords.password_confirm.trim() === passwords.password.trim())) {
        errors.password = 'Les mots de passe ne correspondent pas.';
        errors.password_confirm = 'Les mots de passe ne correspondent pas.';
    }

    if (Object.keys(errors).length !== 0)
        return res.status(400).send(errors);

    next();
};



module.exports = { ValidateSignup, ValidatePasswordChange, ValidateChanges};