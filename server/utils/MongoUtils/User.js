const {ClientHandler} = require("./ClientHandler");
const {ObjectId} = require("mongodb");

const  GetUser = async (query) => {
    const client = await ClientHandler();

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

const  CreateUser = async (data) => {
    const client = await ClientHandler();

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection

        await client.db("GroundR").collection("Users").insertOne(data);

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

const UpdateUser = async (data) => {
    const client = await ClientHandler();

    try{
        await client.connect()

        await client.db("GroundR").collection("Users").replaceOne({_id: data._id}, data)
    } finally {
        await client.close()
    }
}

const UpdateUserPfp = async (userId, filename) => {
    const client = await ClientHandler();

    try {
        await client.connect();
        await client.db("GroundR").collection("Users").updateOne({ _id: userId }, { $set: { pfpURL: filename } });
    } finally {
        await client.close();
    }
}

const  GetAllUsers = async (query, projection={}, limit=500) => {
    const client = await ClientHandler();

    let returnData = [];

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const cursor = await client.db("GroundR").collection("Users").find(query).project(projection).limit(limit);
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


module.exports = { CreateUser, GetAllUsers, GetUser, UpdateUser, UpdateUserPfp }