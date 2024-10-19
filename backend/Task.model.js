import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  taskName: String,
  taskDescription: String,
  taskDeadline: String,
  taskSubject: String,
  dateCreated: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
