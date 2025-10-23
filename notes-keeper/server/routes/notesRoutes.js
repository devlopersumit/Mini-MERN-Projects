const express = require('express');
const auth = require('../middlewares/auth');
const { getNotes, createNote, deleteNote, updateNote } = require('../controllers/notesController');

const router = express.Router();

router.get('/', auth, getNotes);
router.post('/', auth, createNote);
router.put('/:id', auth, updateNote);
router.delete('/:id', auth, deleteNote);