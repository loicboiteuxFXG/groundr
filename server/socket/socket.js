const {Server} = require('socket.io')
const http = require('http')
const express = require('express')

const app = express();

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods:['GET', 'POST', 'PATCH']
    }
})

exports.getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

const userSocketMap = {} //userId: socketId

io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté', socket.id)

    const userId = socket.handshake.query.userId
    if(userId != "undefined") userSocketMap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on('disconnect', () => {
        console.log("Utilisateur déconnecté.", socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

module.exports = {app, io, server}