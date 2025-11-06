import axios from 'axios';

const API_URL = "http://localhost:4040";

const api = axios.create({
    baseURL:API_URL,
    withCredentials:true,
});

//Get all notes
export const getNotes = async () => {
    const res =await api.get('/api/notes');
    return res.data;
};

//Create new note
export const createNote = async (note) => {
    const res = api.post('/api/notes', note)
    return res.data;
};

//update a note
export const updateNote = async (id, note) => {
   const res = await api.put(`/api/notes${id}`, note);
   return res.data;
};

//Delete a note
export const deleteNote = async (id) => {
    const res = api.delete(`/api/notes${id}`);
    return res.data;
};