'use strict'

/**
 * @returns L'objet Client pour accéder à la BD
 */
const ClientHandler = async () => {

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

    return client;
    
}

module.exports = { ClientHandler };