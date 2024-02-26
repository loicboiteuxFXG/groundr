const express = require('express');
const MongoUtils = require('../utils/MongoUtils');
const router = express.Router();
const { upload } = require('express-fileupload');

router.post('/create', (req, res) => {
    MongoUtils.CreateUser(req.body)
        .then(user => {console.dir(user)})
        .catch(err => console.error(err));
});

router.get('/:id', (req, res) => {
    console.log(req.params.id);
})


module.exports = router;