import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please as a title'],
    trim: true,
    maxlength: [24, 'Exceeds 40 characters']
  },
  description: {
    type: String,
    required: true,
    maxlength: [200, 'Exceeds 200 characters']
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