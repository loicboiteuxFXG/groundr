const {Server} = require('socket.io')
const express = require('express')

const app = express();
const fs = require('fs'); // filesystem
const https = require('https'); // import https pour le protocole https

// import du certificat et de la clé privée
// (le certificat est la clé publique)
const certificate = fs.readFileSync('server.cert');
const privateKey = fs.readFileSync('server.key');

const server = https.createServer({key: privateKey, cert: certificate}, app)
const io = new Server(server, {
    cors: {
        origin: ["https://localhost:3000"],
        methods:['GET', 'POST', 'PATCH']
    }
})

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

const userSocketMap = {} //userId: socketId

io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté', socket.id)

    const userId = socket.handshake.query.userId
    if(userId !== "undefined") userSocketMap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on('disconnect', () => {
        console.log("Utilisateur déconnecté.", socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

module.exports = {app, io, server, getReceiverSocketId}