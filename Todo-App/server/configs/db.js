const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGDB_URI);
        console.log(`✅ MongoDB connected Successfully at port ${process.env.PORT}`);
    }catch(err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;