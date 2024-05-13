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

        if(!user) {
            res.status(400).json({error: 'Adresse courriel ou mot de passe invalide.'})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            res.status(400).json({error: 'Adresse courriel ou mot de passe invalide.'})
        }

        const token = generateToken(user)

        res.status(200).json({user: user, token: token})
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
        await newUser.save()
        const token = generateToken(newUser, res)
        res.status(201).json(token)
    } catch (err) {
        next(err)
    }
}
