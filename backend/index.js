const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./src/config/dbConnect')
const authRoutes = require('./src/routes/authRoutes')

require("dotenv").config();
connectDB();

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- ROUTES ---------- */
app.get("/", (req, res) => {
  res.send("AI Study Assistant Backend is running 🚀");
});

app.use("/api/auth", authRoutes);

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
