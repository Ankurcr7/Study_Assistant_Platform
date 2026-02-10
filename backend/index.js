require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");


const connectDB = require("./src/config/dbConnect");
const authRoutes = require("./src/routes/authRoutes");
const noteRoutes = require("./src/routes/noteRoutes");
const aiRoutes = require("./src/routes/aiRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Study Assistant Backend is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/ai", aiRoutes);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "src/uploads"))
);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
console.log(`Server running on port ${PORT}`)
);
