import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please as a title'],
    trim: true,
    maxlength: [90, 'Exceeds 90 characters']
  },
  description: {
    type: String,
    required: true,
    // maxlength: [2000, 'Exceeds 2000 characters']
  },
  createdAt: {
    type: Date,
    default: new Date(),
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  }
})

const Note = models.Note || model('Note', NoteSchema);

export default Note;