'use strict'

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

const MongoUtils = require('./utils/MongoUtils')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


const userRoutes = require('./routes/user');
const fileRoutes = require('./routes/file');
const authRoutes = require('./routes/auth');

app.use('/user', userRoutes);
app.use('/file', fileRoutes);
app.use('/auth', authRoutes);



app.get('/get', async (req, res) => {
    const response = await fetch('https://catfact.ninja/fact');
    const body = await response.json();
    res.send(body);
});

app.get('/db', async (req, res) => {
    const body = await MongoUtils.GetAllUsers();
    console.dir(body);
    res.send(body);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
