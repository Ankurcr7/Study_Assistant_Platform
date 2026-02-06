const express = require('express')
const  authRoutes = require("../controllers/authController");

const router = express.Router();

router.post("/register", authRoutes.registerUser);
router.post("/login", authRoutes.loginUser);

module.exports = router
