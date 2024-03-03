'use strict';

const express = require('express');
const router = express.Router();
const upload = require('../utils/upload/upload');

router.post('/upload', upload.single('file'), (req, res) => {
    // Handle the uploaded file
    res.json({ filename: req.file.filename });
});


module.exports = router;