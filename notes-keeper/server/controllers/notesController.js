const Note = require('../models/notes');

const getNotes = async (req, res) => {
    const notes = await Note.find({user:req.user.id});
    res.json(notes);
};

const createNote = async (req, res) => {
    const {title, content } = req.body;
    const note = await Note.create({title, content, user:req.user.id});
    res.status(201).json(note);
};

const updateNote = async (req, res) => {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(note);
};

const deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({message:'Note Deleted'});
};

module.exports = {getNotes, createNote, updateNote, deleteNote};