const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const notesuser = require("../models/NoteModel");
const { body, validationResult } = require("express-validator");
const router = express.Router();
router.get("/allNotes", fetchuser, async (req, res) => {
  try {
    const notes = await notesuser.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
  // res.json("success");
});
// Posting Notes on My database
router.post(
  "/postNotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { author, title, description, tag } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new notesuser({
        author,
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
router.delete("/deleteNotes/:id", fetchuser, async (req, res) => {
  try {
    let note = await notesuser.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // if the string is valid
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Please valid a user");
    }
    note = await notesuser.findByIdAndDelete(req.params.id);
    res.json({ Sucess: "SuccessFully Deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.put("/updateNote/:id", fetchuser, async (req, res) => {
    const { author, title, description, tag } = req.body;
  try {
    let editednote = {};
    if (author) {
      editednote.author = author;
    }
    if (title) {
      editednote.title = title;
    }
    if (description) {
      editednote.description = description;
    }
    if (tag) {
      editednote.tag = tag;
    }
    let note = await notesuser.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Please valid a user");
    }
    note = await notesuser.findByIdAndUpdate(
      req.params.id,
      { $set: editednote },
      { new: true }
    );
    res.json({ note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
