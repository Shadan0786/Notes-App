const express = require("express");
const Note = require("../models/Note");
const upload = require("../middleware/upload");

const router = express.Router();


router.post("/", upload.single("file"), async (req, res) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      content: req.body.content,
      file: req.file ? req.file.path : null
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const notes = await Note.find(); // 🔥 FIXED
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id); // 🔥 FIXED
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
