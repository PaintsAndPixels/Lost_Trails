const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: String, required: true }, // User identifier
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
