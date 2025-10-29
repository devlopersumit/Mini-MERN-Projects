const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.listen(process.env.PORT ||4444, ()=> {
    console.log(`Server is running successfully on port ${process.env.PORT}`);
})