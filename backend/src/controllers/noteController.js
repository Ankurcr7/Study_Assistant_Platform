const Note = require("../models/Note");

const uploadNote = async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const note = await Note.create({
      title,
      fileUrl: `/uploads/${req.file.filename}`,
      fileType: req.file.mimetype,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      message: "Notes uploaded successfully",
      note,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
};


const getMyNotes = async (req, res) => {
    try {
      const notes = await Note.find({ uploadedBy: req.user.id })
        .sort({ createdAt: -1 });
  
      res.status(200).json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch notes" });
    }
  };


  const fs = require("fs");
  const path = require('path')

  const deleteNote = async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
  
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
  
      if (note.uploadedBy.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
      }
  
      if (note.fileUrl) {
        const filePath = path.join(
          __dirname,
          "../../uploads",
          path.basename(note.fileUrl)
        );
  
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
  
      await note.deleteOne();
      res.status(200).json({ message: "Note deleted successfully" });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete note" });
    }
  };
  
  
module.exports = { uploadNote, getMyNotes, deleteNote };
  
