const express = require("express");
const { askAI, generateQuiz, getChats } = require("../controllers/aiController");

const router = express.Router();

router.post("/ask", askAI);
router.post("/generatequiz", generateQuiz);
router.get("/history", getChats);

module.exports= router;
