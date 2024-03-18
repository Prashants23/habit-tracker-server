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
    type: Date,
    required: true,
  },
  maxTimeline: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedPercentage: {
    type: String,
  },
});

module.exports = Goal = mongoose.model("Goal", GoalSchema);
