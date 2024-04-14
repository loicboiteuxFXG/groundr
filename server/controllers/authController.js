'use strict'

const dotenv = require('dotenv');
dotenv.config();

const User = require("../models/user");
const bcrypt = require('bcrypt')
const generateToken = require("../utils/generateToken")
const {throwError} = require('../utils/errorHandler')

exports.Login = async (req, res, next) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email: email}).populate("interests");

        const isPasswordCorrect = bcrypt.compare(password, user.password || "")

        if (!user || !isPasswordCorrect) {
            res.status(400).json({error: 'Adresse courriel ou mot de passe invalide.'})
        }

        generateToken(user, res)

        res.status(200).json(user)
    } catch (err) {
        console.error(err)
        next(err)
    }
}


exports.Register = async (req, res, next) => {
    const userData = req.body
    console.log(`Register requested from ${userData.email}`)
    try {
        const newUser = new User(userData)

        if(newUser) {
            generateToken(newUser, res)

            await newUser.save()

            res.status(201).json(newUser)
        } else {
            throwError(400, "Données de l'utilisateur invalides.")
        }

    } catch (err) {
        next(err)
    }
}

exports.Logout = async (req, res, next) => {
    try {
        res.cookie('jwt', "", {maxAge: 0})
        res.status(200).send("Compte déconnecté.")
    } catch (err) {
        next(err)
    }
}