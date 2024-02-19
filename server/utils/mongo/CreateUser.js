const config = require("../../../config.json");
const {MongoClient, ServerApiVersion} = require("mongodb");
const  CreateUser = async (data) => {

    const {MongoClient, ServerApiVersion} = require('mongodb');
    const config = require('../../../config.json');
    const uri = `mongodb+srv://cegep:${config.mongo.password}@cluster0.dosk9nq.mongodb.net/?retryWrites=true&w=majority`;
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    let returnData;

    async function run() {
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

    await run().catch(console.dir);
    return returnData;
}

module.exports = { CreateUser };