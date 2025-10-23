const express = require('express');
const auth = require('../middlewares/auth');
const { getNotes, createNote, deleteNote, updateNote } = require('../controllers/notesController');

const notesRouter = express.Router();

notesRouter.get('/', auth, getNotes);
notesRouter.post('/', auth, createNote);
notesRouter.put('/:id', auth, updateNote);
notesRouter.delete('/:id', auth, deleteNote);

module.exports = notesRouter;