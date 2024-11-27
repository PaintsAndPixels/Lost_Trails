const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    placeName: { type: String, required: true },
    description: { type: String },
    user: { type: String, required: true }, // User identifier
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", favoriteSchema);
