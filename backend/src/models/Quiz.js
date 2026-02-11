const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
});

const quizSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    topic: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
