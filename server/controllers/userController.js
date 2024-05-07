'use strict'

const User = require("../models/user")
const Conversation = require('../models/conversation')
const bcrypt = require('bcrypt')

exports.GetUserToken = async (req, res, next) => {
    const userId = req.user._id;
    try {
        const user = await User.findOne({_id:userId}).populate("interests");
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

exports.UpdatePfp = async (req, res, next) => {
    const filename = req.body.filename
    const userId = req.user._id
    try{
        await User.updateOne({_id: userId}, {pfpURL: filename});
        const newUser = await User.findOne({_id:userId});
        console.dir(newUser)
        res.status(200).json(newUser);
    } catch (err){
        next(err)
    }
}

exports.UpdateUserData = async (req, res, next) => {
    const userId = req.user._id
    const data = req.body
    try{
        await User.updateOne({_id: userId}, data);
        const newUser = await User.findOne({_id:userId});
        res.status(200).json(newUser)
    } catch (err){
        next(err)
    }
}

exports.UpdateUserPassword = async (req, res, next) => {
    const userId = req.user._id
    const newPassword = req.body.password
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedNewPassword = await bcrypt.hash(newPassword, salt)

        await User.updateOne({_id: userId}, {password: hashedNewPassword});
        res.status(200).send();
    } catch (err){
        next(err)
    }
}


exports.setLocation = async (req, res, next) => {
    const userId = req.user._id;
    try {
        const updatedUser = await User.findOne({_id: userId})
        updatedUser.location.coordinates = [req.body.latitude, req.body.longitude]
        await updatedUser.save()
        res.status(200).send()
    } catch (err) {
        next(err)
    }
}

exports.getUsersForSidebar = async (req, res, next) => {
    try{
        const authUserId = req.user._id

        const conversations = await Conversation.find({participants : {$in : authUserId}})
        console.log(conversations)

        const ids = []
        for (let conversation of conversations) {
            conversation.participants.forEach((i) => {
                if (!authUserId.equals(i)) {
                    ids.push(i)
                }
            })
        }
        console.log(ids)

        const users = await User.find({
            _id: {$in: ids}
        })
        console.dir(users)

        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}


exports.UpdateUserPremium = async (req, res, next) => {
    const userId = req.user._id;
    try {
        await User.findByIdAndUpdate(userId, {isPremium: true});
        const updatedUser = await User.findOne({_id: userId});
        res.status(200).json(updatedUser)
    } catch (err) {
        next(err)
    }
}

exports.getResearchedUsers = async (req, res, next) => {
    const criterias = req.body
    try {
        let sort = {}
        if (criterias.sort === "alphabetical") {
            sort = { name: -1 }
        }
        if (criterias.sort === "gender") {
            sort = {gender: 1}
        }
        if (criterias.sort === "orientation") {
            sort = { orientation: 1 }
        }

        const regexp = new RegExp(criterias.name, "i")
        const users = await User.find({
            $and: [
                { $or : [{firstName: regexp}, {lastName: regexp}] },
                { gender: { $in: criterias.genders } },
                { orientation: { $in: criterias.orientations } }
            ]
        }).sort(sort)

        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}
