const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },

    format: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);