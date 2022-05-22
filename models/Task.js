import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Task cannot be empty'],
    trim: true,
    maxlength: [24, 'Exceeds 24 characters']
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const Task = models.Task || model('Task', TaskSchema);

export default Task;