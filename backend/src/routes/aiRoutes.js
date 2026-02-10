const express = require("express");
const { askAI, generateQuiz } = require("../controllers/aiController");

const router = express.Router();

router.post("/ask", askAI);
router.post("/generatequiz", generateQuiz);

module.exports= router;
