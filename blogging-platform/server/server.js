const express = require('express');
const connectDB = require('./configs/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors())

//MongoDB Connection
connectDB();

app.get('/', (req, res) => {
    res.send("Hello World!")
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running succcessfully on Port ${PORT}`)
});