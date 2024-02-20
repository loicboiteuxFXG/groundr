const express = require('express');
const MongoUtils = require('../utils/MongoUtils');
const router = express.Router();

router.post('/create', (req, res) => {
    MongoUtils.CreateUser(req.body)
        .then(user => {console.dir("Created user" + user)})
        .catch(err => console.error(err));
});


module.exports = router;