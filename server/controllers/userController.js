'use strict'

const User = require("../models/user");

const GetUserToken = async (req, res, next) => {
    const userId = req.user._id;
    try {
        const user = await User.findOne({_id:userId});
        res.status(200).json(user)
    } catch (err) {
        console.error(err);
    }
}

const UpdatePfp = async (req, res) => {
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

const UpdateUserData = async (req, res) => {
    const data = req.body;
    const userId = req.user._id
    try{
        await User.updateOne({_id: userId}, req.body);
        const newUser = await User.findOne({_id:userId});
        res.send(newUser)
    } catch (err){
        console.error(err)
    }
}

const UpdateUserPassword = async (req, res) => {
    const userId = req.user._id
    const newPassword = req.body.password
    try{
        await User.updateOne({_id: userId}, {password: newPassword});
        res.status(200).send();
    } catch (err){
        console.error(err);
    }
}

const UpdateUserPremium = async (req, res) => {
    const userId = req.user._id;
    try {
        await User.findByIdAndUpdate(userId, {isPremium: true});
        const updatedUser = await User.findOne({_id: userId});
        res.status(200).json(updatedUser)
    } catch (err) {
        console.error(err);
    }
}

module.exports = {GetUserToken, UpdatePfp, UpdateUserData, UpdateUserPassword, UpdateUserPremium}