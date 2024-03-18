'use strict'

const {GetUser, UpdateUserPfp} = require('../utils/MongoUtils')
const {ObjectId} = require("mongodb");

const GetUserToken = (req, res) => {
    const user = req.user
    GetUser({email: user.email})
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => console.log(err))
}

const UpdatePfp = async (req, res) => {
    try{
        await UpdateUserPfp(new ObjectId(req.user._id), req.body.filename)
    } catch (err){
        console.error(err)
    }
    const newUser = await GetUser({_id: new ObjectId(req.user._id)})
    res.status(200).send(newUser)
}

module.exports = {GetUserToken, UpdatePfp}