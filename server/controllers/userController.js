'use strict'

const User = require("../models/user")
const Conversation = require('../models/conversation')
const bcrypt = require('bcrypt')
const {stderr} = require("process");

exports.GetUserToken = async (req, res, next) => {
    const userId = req.user._id;
    try {
        const user = await User.findOne({_id:userId}).populate("interests");
        res.status(200).json(user)
    } catch (err) {
        console.error(err);
    }
}

exports.UpdatePfp = async (req, res) => {
    const filename = req.body.filename
    const userId = req.user._id
    try{
        await User.updateOne({_id: userId}, {pfpURL: filename});
        const newUser = await User.findOne({_id:userId});
        console.dir(newUser)
        res.status(200).json(newUser);
    } catch (err){
        console.error(err);
    }
}

exports.UpdateUserData = async (req, res) => {
    const userId = req.user._id
    try{
        await User.updateOne({_id: userId}, req.body);
        const newUser = await User.findOne({_id:userId});
        res.status(200).json(newUser)
    } catch (err){
        console.error(err)
    }
}

exports.UpdateUserPassword = async (req, res) => {
    const userId = req.user._id
    const newPassword = req.body.password
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedNewPassword = await bcrypt.hash(newPassword, salt)

        await User.updateOne({_id: userId}, {password: hashedNewPassword});
        res.status(200).send();
    } catch (err){
        console.error(err)
    }
}

exports.getUsersForSidebar = async (req, res, next) => {
    try{
        const authUserId = req.user._id

        const conversations = Conversation.find({participants : {$in : authUserId}})

        const ids = []
        for (conversation of conversations) {
            conversation.participants.forEach((i) => {
                if (i !== authUserId) {
                    ids.push(i)
                }
            })
        }

        const users = await User.find({
            _id: {$in: ids}
        })


        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}


exports.UpdateUserPremium = async (req, res) => {
    const userId = req.user._id;
    try {
        await User.findByIdAndUpdate(userId, {isPremium: true});
        const updatedUser = await User.findOne({_id: userId});
        res.status(200).json(updatedUser)
    } catch (err) {
        console.error(err);
    }
}