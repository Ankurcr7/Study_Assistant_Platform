import { useState, useRef } from "react";
import axios from "axios";

const UploadNotes = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      setLoading(true);
      setProgress(0);

      await axios.post(
        "https://study-assistant-platform.onrender.com/api/notes/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          onUploadProgress: (event) => {
            if (event.total) {
              const percent = Math.round(
                (event.loaded * 100) / event.total
              );
              setProgress(percent);
            }
          },
        }
      );
      

      alert("Notes uploaded successfully ✅");

      // Reset form
      setTitle("");
      setFile(null);
      setProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <h1>Upload Notes 📄</h1>
      <p className="subtitle">
        Upload your study materials and let AI handle the rest
      </p>

      <form className="upload-card" onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Notes Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileInputRef}
          disabled={loading}
        />

        {file && (
          <p className="file-name">
            Selected: <strong>{file.name}</strong>
          </p>
        )}

        {loading && (
          <div style={{ marginTop: "10px" }}>
            <p>Uploading: {progress}%</p>
            <div
              style={{
                height: "6px",
                width: "100%",
                background: "#ddd",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "#4CAF50",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Notes"}
        </button>
      </form>
    </div>
  );
};

export default UploadNotes;
