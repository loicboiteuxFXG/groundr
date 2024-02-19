const express = require('express');
const {MongoHandler} = require("../utils/mongo/MongoHandler");
const {CreateUser} = require("../utils/mongo/CreateUser");
const router = express.Router();

router.post('/create', (req, res) => {
    CreateUser(req.body)
});


module.exports = router;