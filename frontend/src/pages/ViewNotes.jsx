import axios from "axios";
import { useState } from "react";

const ViewNotes = ({ note, onClose, onDelete }) => {
  const [deleting, setDeleting] = useState(false);

  // ✅ Handle Delete
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) return;

    try {
      setDeleting(true);

      await axios.delete(
        `https://study-assistant-platform.onrender.com/api/notes/${note._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Note deleted successfully ✅");

      onDelete(note._id);
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete note");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="view-overlay">
      <div className="view-modal">
        
        {/* Header */}
        <div className="view-header">
          <h2>{note.title}</h2>
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
        </div>

        {/* PDF Preview */}
        <div className="preview-container">
          <iframe
            src={`https://docs.google.com/gview?url=${note.fileUrl}&embedded=true`}
            width="100%"
            height="500px"
            title="Note Preview"
            style={{ border: "none" }}
          />
        </div>

        {/* Actions */}
        <div className="view-actions">
          <button
            className="delete-btn"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewNotes;
