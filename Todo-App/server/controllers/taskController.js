const Task = require('../models/taskModel');

//Get all tasks
const getTasks = async (req, res) => {
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }catch(err) {
        res.status(500).json({message: 'Failed to fetch tasks'});
    }
};

//Create a task
const createTask = async (req, res) => {
    try{
        const {title, description, deadline } = req.body;

        if(!title) {
            res.status(400).json({message:'Title is required'});
        }

        const newTask = await Task.create({
            title, description, deadline, isCompleted:false,
        });

        res.status(200).json(newTask);
    }catch(err) {
        res.status(500).json({message:'Failed to create a task'});
    }
};

//update a task
const updateTask = async (req, res) => {
    try{
        const task =await Task.findById(req.params.id);

        if(!task) {
            res.status(404).json({message:'task not found'});
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true});

        res.status(200).json(updatedTask);
    }catch(err) {
        res.status(500).json({message:'Failed to update task'});
    }
};

//delete a task
const deleteTask = async (req, res) => {
    try{
        const task = await Task.findById(req.params.id);

        if(!task) {
            res.status(404).json({message:'task not found'});
        }

        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'task deleted succesfully!'});
    }catch(err) {
        res.status(500).json({message:'Failed to delete a task'});
    }
};

module.exports = {getTasks, createTask, updateTask, deleteTask};