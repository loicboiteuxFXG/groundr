const {ClientHandler} = require("./ClientHandler");

const  GetInterests = async () => {
    const client = await ClientHandler();

    let returnData = [];

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const cursor = await client.db("GroundR").collection("Interests").find().limit(100);

        for await (const doc of cursor) {

            returnData.push(doc);

        }

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }

    return returnData;
}


module.exports = { GetInterests }