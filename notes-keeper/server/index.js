const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(4040, () => console.log("Server is successfully running on port 4040")
);