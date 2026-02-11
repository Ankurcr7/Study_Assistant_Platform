const express = require("express");
const protect = require("../middleware/authMiddleware");
const { askAI, generateQuiz, getChats, getQuizHistory } = require("../controllers/aiController");

const router = express.Router();

router.post("/ask", protect, askAI);
router.post("/generatequiz", protect, generateQuiz);
router.get("/history", protect, getChats);
router.get("/quizhistory", protect, getQuizHistory);


module.exports= router;
