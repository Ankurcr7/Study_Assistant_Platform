import { useEffect, useState } from "react";
import axios from "axios";
import ViewNotes from "./ViewNotes";

const MyNotes = ({setPage}) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(
                    "http://localhost:5000/api/notes/my",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setNotes(res.data);
            } catch (error) {
                alert("Failed to load notes");
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this note?")) return;

        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/notes/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setNotes(notes.filter((note) => note._id !== id));
        } catch (error) {
            alert("Failed to delete note");
        }
    };


    if (loading) return <p className="loading">Loading notes...</p>;

    return (
        <div className="notes-page">
            <div className="notes-header">
                <h1>📄 My Notes</h1>
                <p>All your uploaded study materials in one place</p>
            </div>

            {notes.length === 0 ? (
                <div className="empty-state">
                    <p>😕 No notes uploaded yet</p>
                    <span>Upload notes to start learning smarter</span>
                </div>
            ) : (
                <div className="notes-grid">
                    {notes.map((note) => (
                        <div key={note._id} className="note-card">
                            <div className="note-icon">📘</div>

                            <h3>{note.title}</h3>
                            <p className="file-type">{note.fileType}</p>

                            <div className="note-actions">
                                <button
                                    className="view-btn"
                                    onClick={() => setSelectedNote(note)}
                                >
                                    View
                                </button>



                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(note._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedNote && (
                <ViewNotes note={selectedNote} setPage={setPage} />
            )}
        </div>

    );

}

export default MyNotes;
