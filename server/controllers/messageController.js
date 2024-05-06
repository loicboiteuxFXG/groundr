'use strict'

const Conversation = require('../models/conversation')
const Message = require('../models/message')
const {io} = require('../socket/socket')
import {getReceiverSocketId} from "../socket/socket";

exports.getMessages = async (req, res, next) => {
    try {
        const userToChatId = req.params.id
        const senderId = req.user._id


        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate('messages')

        if(!conversation) {
            res.status(200).json([])
        }

        const messages = conversation.messages
        res.status(200).json(messages)
    } catch (err) {
        next(err)
    }
}

exports.sendMessage = async (req, res, next) => {
    try {
        const {message} = req.body
        const receiverId = req.params.id
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(), newMessage.save()])

        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)
    } catch (err) {
        next(err)
    }
}