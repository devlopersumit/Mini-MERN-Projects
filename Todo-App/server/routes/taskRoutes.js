const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

//get all tasks
router.get('/', getTasks);

//create a task
router.post('/', createTask);

//update task
router.put('/:id', updateTask);

//delete task
router.delete('/:id', deleteTask);

module.exports = router;