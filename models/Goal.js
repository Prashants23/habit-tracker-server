// models/Goal.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Goal Schema
const GoalSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  goalName: {
    type: String,
    required: true,
  },
  minTimeline: {
    type: Number,
    required: true,
  },
  maxTimeline: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = Goal = mongoose.model("Goal", GoalSchema);
