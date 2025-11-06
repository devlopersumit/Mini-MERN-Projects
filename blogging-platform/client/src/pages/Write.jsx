import { useState } from "react";
import { api } from "../api";

const Write = () => {
    const[form, setForm] = useState({title:"", content:""});

    const handleSubmit = (e) => {
        e.prevenDefault();
        api.post('/posts', form);
    };

    return (
        <div className="flex justify-center items-center">
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={form.title}
        placeholder="Enter teh title"
        onChange={e => setForm({...form, title:e.target.value})} />

    <textarea
    value={form.content}
    placeholder="Enter the content"
    onChange={e => setForm({...form, content:e.target.value})} />

    <button type="submit">Create</button>

    </form>
        </div>
    );
};

export default Write;