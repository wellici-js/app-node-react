const express = require('express');
const json = require('./character.json');

const app = express();
const port = process.env.PORT || 5000;

app.get('/rick-and-morty', (req, res) => {
    res.send({ express: json});
});

app.listen(port, () => console.log(`Listening on port ${port}`));