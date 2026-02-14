const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { askAI, generateQuiz, getChats, getQuizHistory } = require("../controllers/aiController");

const router = express.Router();

router.post("/ask", authMiddleware, askAI);
router.post("/generatequiz", authMiddleware, generateQuiz);
router.get("/history", authMiddleware, getChats);
router.get("/quizhistory", authMiddleware, getQuizHistory);


module.exports= router;
