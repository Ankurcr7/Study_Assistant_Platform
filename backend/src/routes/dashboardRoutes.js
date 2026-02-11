const express = require("express");
const router = express.Router();
const { getUserData } = require("../controllers/dashboardController");
const protect = require("../middleware/authMiddleware");

router.get("/stats", protect, getUserData);

module.exports = router;
