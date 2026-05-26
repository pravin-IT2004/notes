const Note = require("../models/Note");


// CREATE
const createNote = async (req, res) => {
  try {
    const { topic, format, content } = req.body;

    if (!topic || !format || !content) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const note = await Note.create({
      topic,
      format,
      content,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// READ
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({
      createdAt: -1,
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE
const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);

    res.json({
      message: "Note deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  deleteNote,
};