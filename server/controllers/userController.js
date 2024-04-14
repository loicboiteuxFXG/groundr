'use strict'

const User = require("../models/user")
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
        await User.updateOne({_id: userId}, {pfpUrl: filename});
        const newUser = await User.findOne({_id:userId});
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

    const salt = bcrypt.genSalt(10)
    const hashedNewPassword = bcrypt.hash(newPassword, salt)
    try{
        await User.updateOne({_id: userId}, {password: hashedNewPassword});
        res.status(200).send();
    } catch (err){
        console.error(err)
    }
}

exports.getUsersForSidebar = async (req, res, next) => {
    try{
        const authUserId = req.user._id

        const users = await User.find({
            _id: {$ne: authUserId}
        })


        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}