const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean
    },
    deadline:{
        type:Date
    },
},{
    timestamps:true
});

module.exports = mongoose.model("Task", taskSchema);