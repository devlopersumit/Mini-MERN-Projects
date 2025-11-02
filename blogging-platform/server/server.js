const express = require('express');
const connectDB = require('./configs/db');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors())

//MongoDB Connection
connectDB();

//userRoutes
app.use('/api/auth', authRouter)

//postRoutes
app.use('/api', postRouter);

app.get('/', (req, res) => {
    res.send("Hello World!")
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running succcessfully on Port ${PORT}`)
});