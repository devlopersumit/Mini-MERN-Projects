const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./configs/db');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//Database Connection
connectDB();

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.listen(process.env.PORT ||4444, ()=> {
    console.log(`Server is running successfully on port ${process.env.PORT}`);
})