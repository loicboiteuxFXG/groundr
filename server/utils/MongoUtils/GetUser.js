'use strict'
const { ClientHandler } = require('./ClientHandler')

const  GetUser = async (query) => {
    const client = await ClientHandler()

    let returnData = {};

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        returnData = await client.db("GroundR").collection("Users").findOne(query);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close(); 
    }

    return returnData;
}

module.exports = { GetUser };