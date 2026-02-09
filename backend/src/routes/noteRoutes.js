const express = require("express");
const multer = require("multer");
const protect = require("../middleware/authMiddleware");
const { uploadNote, getMyNotes, deleteNote } = require("../controllers/noteController");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const upload = require("../middleware/upload");
const Note = require("../models/Note");


const router = express.Router();


/* ---------- ROUTE ---------- */
// router.post(
//     "/upload",
//     protect,
//     upload.single("file"),
//     uploadNote
//     );
// router.get("/my", protect, getMyNotes);

/* ---------- UPLOAD NOTE ---------- */
router.post("/upload",protect, upload.single("file"), async (req, res) => {
    try {
      const { title } = req.body;
      const filePath = req.file.path;
      const fileType = req.file.mimetype;
  
      let extractedText = "";
  
      if (fileType === "application/pdf") {
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);
        extractedText = pdfData.text;
      }
  
      if (
        fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const result = await mammoth.extractRawText({ path: filePath });
        extractedText = result.value;
      }
  
      const note = await Note.create({
        title,
        fileName: req.file.filename,
        filePath,
        extractedText,
      });
  
      res.status(201).json({
        message: "Note uploaded successfully",
        note,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  /* ---------- GET ALL NOTES ---------- */
  router.get("/", async (req, res) => {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  });


  router.get("/my", protect, getMyNotes);
router.delete("/:id", protect, deleteNote);


module.exports = router;
