const express = require("express");
const { askAI, generateQuiz, getChats, getQuizHistory } = require("../controllers/aiController");

const router = express.Router();

router.post("/ask", askAI);
router.post("/generatequiz", generateQuiz);
router.get("/history", getChats);
router.get("/quizhistory", getQuizHistory);

module.exports= router;
