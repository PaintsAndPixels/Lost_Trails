const express = require("express");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");

const router = express.Router();

// Add a note
router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("user").notEmpty().withMessage("User is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, content, user } = req.body;
      const note = new Note({ title, content, user });
      await note.save();
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ error: "Failed to add note" });
    }
  }
);

// Get all notes
router.get("/:user", async (req, res) => {
  try {
    const notes = await Note.find({ user: req.params.user });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

module.exports = router;
