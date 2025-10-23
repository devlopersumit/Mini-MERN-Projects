const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("✅ MongoDB Connected Succesfully");
    
}).catch((err) => {
    console.error("MongoDB Connection Error: ", err);
});

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(4040, () => console.log("Server is successfully running on port 4040")
);