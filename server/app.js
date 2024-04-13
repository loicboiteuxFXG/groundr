'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT;
const groundrDbURI = process.env.MONGO_DB_URI

const MongoUtils = require('./utils/MongoUtils');
const isAuth = require('./middleware/is-auth');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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


app.get('/get', isAuth, async (req, res) => {
    console.log("requested cat fact");
    const response = await fetch('https://catfact.ninja/fact');
    const body = await response.json();
    res.send(body);
});



app.get('/db', async (req, res) => {
    const body = await MongoUtils.GetAllUsers();
    console.dir(body);
    res.send(body);
});

app.use((err, req, res, next) => {

    console.log("err", err)
    if (!err.statusCode) {
        err.statusCode = 500
    }

    res.status(err.statusCode).json({message: err.message, statusCode: err.statusCode})
})


/* const DATA = require('./MOCK_DATA.json')
app.get('/add', async (req, res) => {
    await MongoUtils.CreateUser(DATA)
    res.send("OK")
}) */
mongoose.connect(groundrDbURI)
    .then(response => {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    })

