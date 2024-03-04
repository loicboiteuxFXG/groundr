'use strict';

const express = require('express');
const router = express.Router();
const upload = require('../utils/upload/upload');

router.post('/upload', upload.single('file'), (req, res) => {
    // Handle the uploaded file
    if(typeof req.file !== 'undefined'){
        res.json({ filename: req.file.filename });
    }else{
        res.json({filename: "default-user.png"})
    }
});


module.exports = router;