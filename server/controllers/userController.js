'use strict'

const {GetUser} = require('../utils/MongoUtils')

const GetUserToken = (req, res) => {
    const user = req.user
    GetUser({email: user.email})
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => console.log(err))
}

module.exports = {GetUserToken}