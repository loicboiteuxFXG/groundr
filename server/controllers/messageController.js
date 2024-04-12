'use strict'

exports.sendMessage = async (req,res,next) => {
    try{
        const userId = req.params.id
        const {message} = req.body
        const senderId = req.user.userId


    } catch (err) {
        res.status(500).json({error: err.message})
    }


}