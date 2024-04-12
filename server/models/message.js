'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, 'L\'envoyeur est obligatoire.']
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, 'Le receveur est obligatoire.']
    },
    message: {
        type: String,
        required: [true, 'Le message doit contenir du texte.']
    }
}, {timestamps: true})

module.exports = mongoose.model('message', messageSchema)