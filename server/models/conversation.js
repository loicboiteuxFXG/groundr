'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const conversationSchema = new Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'user'
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'message',
            default: []
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model('conversation', conversationSchema)