const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: String,
    fileUrl: String,
    publicId: String,
    fileType: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
