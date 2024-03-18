// models/Goal.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Goal Schema
const LogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  typeId: {
    type: String,
    required: true,
  },
  type: {
    type: String, // Corrected type definition
    enum: ["Goal", "Task"], // Define allowed values as an enum
    required: true,
  },

  action: {
    type: String,
    required: true,
  },
  // previousState: {
  //   type: mongoose.Schema.Types.Mixed,
  // },
  // nextState: {
  //   type: mongoose.Schema.Types.Mixed,
  // },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Log = mongoose.model("Log", LogSchema);

module.exports = Log;
