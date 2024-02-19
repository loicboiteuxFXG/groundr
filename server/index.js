const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());



app.get('/get', async (req, res) => {
    const response = await fetch('https://catfact.ninja/fact');
    const body = await response.json();
    res.send(body);
});


app.post('/post', async (req, res) => {
    const data = req.body;
    console.log(data); // always good practice to verify your data is coming through in the shape you expect it to be in.
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})