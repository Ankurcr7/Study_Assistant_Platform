const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const { uploadNote, deleteNote, getMyNotes } = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/upload", authMiddleware, upload.single("file"), uploadNote);

router.get("/my", authMiddleware, getMyNotes);

router.delete("/:id", authMiddleware, deleteNote);


module.exports = router;
