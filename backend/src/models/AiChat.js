const mongoose = require("mongoose");

const aiChatSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AiChat", aiChatSchema);
