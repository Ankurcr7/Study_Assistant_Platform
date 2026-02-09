import { useEffect, useState } from "react";
import axios from "axios";

const ViewNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/notes")
      .then(res => setNotes(res.data));
  }, []);

  return (
    <div>
      <h2>Your Notes</h2>

      {notes.map(note => (
        <div key={note._id} style={{ marginBottom: "20px" }}>
          <h3>{note.title}</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {note.extractedText}
          </pre>

          <a
            href={`http://localhost:5000/uploads/${note.fileName}`}
            target="_blank"
            rel="noreferrer"
          >
            View Original File
          </a>
        </div>
      ))}
    </div>
  );
};

export default ViewNotes;
