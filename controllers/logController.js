// controllers/logController.js
const Log = require("../models/Logs");

// Function to log user activity
async function logActivity(
  userId,
  typeId,
  type,
  action,
  previousState,
  nextState
) {
  try {
    const log = new Log({
      userId,
      typeId,
      type,
      action,
      previousState,
      nextState,
    });
    await log.save();
    console.log("Activity logged successfully.");
  } catch (error) {
    console.error("Error logging activity:", error);
  }
}

module.exports = {
  logActivity,
};
