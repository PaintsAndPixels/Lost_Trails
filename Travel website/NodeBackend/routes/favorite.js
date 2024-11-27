const express = require("express");
const { body, validationResult } = require("express-validator");
const Favorite = require("../models/Favorite");

const router = express.Router();

// Add a favorite
router.post(
  "/",
  [
    body("placeName").notEmpty().withMessage("Place name is required"),
    body("user").notEmpty().withMessage("User is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { placeName, description, user } = req.body;
      const favorite = new Favorite({ placeName, description, user });
      await favorite.save();
      res.status(201).json(favorite);
    } catch (error) {
      res.status(500).json({ error: "Failed to add favorite" });
    }
  }
);

// Get all favorites
router.get("/:user", async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.params.user });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

module.exports = router;
