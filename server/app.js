'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();
const port = 3001;

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

app.use('/user', userRoutes);
app.use('/file', fileRoutes);
app.use('/auth', authRoutes);
app.use('/swipe', swipeRoutes);

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


/* const DATA = require('./MOCK_DATA.json')
app.get('/add', async (req, res) => {
    await MongoUtils.CreateUser(DATA)
    res.send("OK")
}) */

const groundrDbURI = `mongodb+srv://cegep:QrL8EtGQ8OTz92fg@cluster0.dosk9nq.mongodb.net/GroundR?retryWrites=true&w=majority`;
mongoose.connect(groundrDbURI)
    .then(response => {
        mongoose
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    })

