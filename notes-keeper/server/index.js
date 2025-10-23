const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const userRouter = require('./routes/userRoutes');
const notesRouter = require('./routes/notesRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));

//MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("✅ MongoDB Connected Succesfully");
    
}).catch((err) => {
    console.error("MongoDB Connection Error: ", err);
});

//Routes
app.use('/api/users', userRouter);
app.use('/api/notes', notesRouter);

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(process.env.PORT, () => console.log("Server is successfully running on port 4040")
);