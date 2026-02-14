const Note = require("../models/Note");
const cloudinary = require("../config/cloudinary");

const uploadNote = async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw", 
    });

    const note = await Note.create({
      title,
      fileUrl: result.secure_url, 
      publicId: result.public_id,   
      fileType: req.file.mimetype,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      message: "Note uploaded successfully ✅",
      note,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.uploadedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await cloudinary.uploader.destroy(note.publicId, {
      resource_type: "raw",
    });

    await note.deleteOne();

    res.status(200).json({ message: "Note deleted successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyNotes = async (req, res) => {
  try {
    const notes = await Note.find({ uploadedBy: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(notes);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadNote,
  deleteNote,
  getMyNotes,
};
