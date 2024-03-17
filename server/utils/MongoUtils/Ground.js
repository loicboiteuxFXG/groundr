const {ClientHandler} = require("./ClientHandler");
const {ObjectId} = require("mongodb");

const  CreateGround = async (senderID, receiverID, status) => {
    const client = await ClientHandler();

    const groundSender = new ObjectId(senderID);
    const groundReceiver = new ObjectId(receiverID);

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection

        await client.db("GroundR").collection("Grounds").insertOne({sender: groundSender, receiver: groundReceiver, status: status});

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}


const  DeleteGround = async (id) => {
    const client = await ClientHandler();

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection

        await client.db("GroundR").collection("Grounds").deleteOne({_id: id});

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

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

const  UpdateGround = async (id, data) => {
    const client = await ClientHandler();

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection

        await client.db("GroundR").collection("Grounds").updateOne({_id: id}, {$set: data});

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

module.exports = { CreateGround, DeleteGround, GetAllGrounds, UpdateGround }