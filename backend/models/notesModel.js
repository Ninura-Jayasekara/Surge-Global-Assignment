const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
      
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
      },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
  },
  {
    timestamps: true,
  }
)
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;