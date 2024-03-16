'use strict'
const { ClientHandler } = require('./ClientHandler')

const  GetAllGrounds = async (query, projection={_id: true, sender: true, receiver: true, status: true}, limit=500) => {
    const client = await ClientHandler();

    let returnData = [];

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const cursor = await client.db("GroundR").collection("Grounds").find(query).project(projection).limit(limit);
        // Print returned documents

        for await (const doc of cursor) {

            returnData.push(doc);

        }
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close(); 
    }

    return returnData;
}

module.exports = { GetAllGrounds };