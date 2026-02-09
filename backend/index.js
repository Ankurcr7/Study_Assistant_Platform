const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/dbConnect");
const path = require("path");
const authRoutes = require("./src/routes/authRoutes");
const noteRoutes = require("./src/routes/noteRoutes");



require("dotenv").config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Study Assistant Backend is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "src/uploads"))
);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
console.log(`Server running on port ${PORT}`)
);
