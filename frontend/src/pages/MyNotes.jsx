import { useEffect, useState } from "react";
import axios from "axios";
import ViewNotes from "./ViewNotes";

const MyNotes = ({ setPage }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedNote, setSelectedNote] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const removeNoteFromUI = (id) => {
        setNotes(prev => prev.filter(note => note._id !== id));
    };

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setPage("login");
                    return;
                }

                const res = await axios.get(
                    "https://study-assistant-platform.onrender.com/api/notes/my",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setNotes(res.data);
            } catch (error) {
                console.error("Failed to fetch notes");
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, [setPage]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this note?")) return;

        try {
            setDeletingId(id);

            const token = localStorage.getItem("token");

            await axios.delete(
                `https://study-assistant-platform.onrender.com/api/notes/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setNotes((prev) => prev.filter((note) => note._id !== id));

        } catch (error) {
            alert("Failed to delete note");
        } finally {
            setDeletingId(null);
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
                            <p className="file-type">
                                {note.fileType?.split("/")[1]?.toUpperCase()}
                            </p>

                            <div className="note-actions">
                                {/* View Button */}
                                <button
                                    className="view-btn"
                                    onClick={() => setSelectedNote(note)}
                                >
                                    View
                                </button>

                                {/* Delete Button */}
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(note._id)}
                                    disabled={deletingId === note._id}
                                >
                                    {deletingId === note._id ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedNote && (
                <ViewNotes
                    note={selectedNote}
                    onClose={() => setSelectedNote(null)}
                    onDelete={removeNoteFromUI}
                />
            )}
        </div>
    );
};

export default MyNotes;
