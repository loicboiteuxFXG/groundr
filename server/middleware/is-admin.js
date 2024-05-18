'use strict'

exports.isAdmin = (req, res, next) => {
    const user = req.user
    try {
        if(!user.isAdministrator) {
            const error = new Error("L'utilisateur n'est pas un admin")
            error.statusCode = 403
            throw error
        }

        next()
    } catch (err) {
        next(err)
    }
}