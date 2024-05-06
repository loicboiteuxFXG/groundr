'use strict';

const express = require('express');
const {app, server} = require('./socket/socket')
const cors = require('cors')
const mongoose = require("mongoose")
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT;
const groundrDbURI = process.env.MONGO_DB_URI

const isAuth = require('./middleware/is-auth');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    res.setHeader('Access-Control-Allow-Credentials', 'true');

    next();
});



const userRoutes = require('./routes/user');
const fileRoutes = require('./routes/file');
const authRoutes = require('./routes/auth');
const swipeRoutes = require('./routes/swipe');
const messageRoutes = require('./routes/message');

app.use('/user', userRoutes);
app.use('/file', fileRoutes);
app.use('/auth', authRoutes);
app.use('/swipe', swipeRoutes);
app.use('/message', messageRoutes);

app.use('/media', express.static(__dirname + '/media'));

app.use((err, req, res, next) => {

    console.log("err", err)
    if (!err.statusCode) {
        err.statusCode = 500
    }

    res.status(err.statusCode).json({message: err.message, statusCode: err.statusCode})
})


mongoose.connect(groundrDbURI)
    .then(response => {
        server.listen(port, () => {
            console.log(`GroundR app listening on port ${port}`);
        });
    })

