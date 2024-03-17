'use strict'

const {GetUser, UpdateUserPfp} = require('../utils/MongoUtils')

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
        await UpdateUserPfp(req.userId, req.filename)
    } catch (err){
        console.error(err)
    } finally {
        res.status(200).send("Ok")
    }
}

module.exports = {GetUserToken, UpdatePfp}