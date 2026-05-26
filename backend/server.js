const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// TEST ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("Backend Server Running");
});

// ======================
// MONGODB CONNECTION
// ======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ======================
// SCHEMA + MODEL (UPDATED)
// ======================
const noteSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true, // bullet / qa / detailed
  },
  generatedText: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model("Note", noteSchema);

// ======================
// CREATE NOTE
// ======================
app.post("/notes", async (req, res) => {
  try {
    const note = new Note({
      subject: req.body.subject,
      topic: req.body.topic,
      type: req.body.type,
      generatedText:
        req.body.generatedText ||
        `Generated ${req.body.type} notes for ${req.body.topic}`,
    });

    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// GET ALL NOTES
// ======================
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// DELETE NOTE
// ======================
app.delete("/notes/:id", async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// SERVER START
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});