const express = require("express");
const router = express.Router();
const { getUserData } = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/stats", authMiddleware, getUserData);

module.exports = router;
