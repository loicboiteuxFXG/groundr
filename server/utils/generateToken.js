'use strict'

const jwt = require('jsonwebtoken')

const generateTokenAndSetCookie = (user, res) => {
    const token = jwt.sign({
            _id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            userId: user._id.toString()
        },
        process.env.SECRET_JWT,
        {expiresIn: "1h"}
    )

    res.cookie('jwt', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development'
    })
}

export default generateTokenAndSetCookie