'use strict'
const { ClientHandler } = require('./ClientHandler')

const  CreateGround = async (data) => {
    const client = await ClientHandler();

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection

        await client.db("GroundR").collection("Grounds").insertOne(data);

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

module.exports = { CreateGround };