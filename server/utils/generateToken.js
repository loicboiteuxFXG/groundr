'use strict'

const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    const token = jwt.sign({
            _id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname
        },
        process.env.SECRET_JWT,
        {expiresIn: "1h"}
    )

    return token
}

module.exports = generateToken