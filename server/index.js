const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors());

app.get('/', async (req, res) => {
    const response = await fetch('https://catfact.ninja/fact');
    const body = await response.json();
    res.send(body);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})