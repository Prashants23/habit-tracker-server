// models/Task.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Task Schema
const TaskSchema = new Schema({
  goalId: {
    type: Schema.Types.ObjectId,
    ref: "Goal",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  taskName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  frequency: {
    type: String,
    // enum: ,
    required: true,
  },
  customFrequency: {
    days: [{ type: Number }], // 0-6 representing Sunday to Saturday
    times: [{ type: String }], // Array of time strings in 'hh:mm' format
  },
  reminders: {
    type: Boolean,
    default: false,
  },
  reminderTime: {
    type: Date,
  },
});

module.exports = Task = mongoose.model("Task", TaskSchema);
