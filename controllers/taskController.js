// controllers/taskController.js
const Task = require("../models/Task");

// @desc  Create a new task
exports.createTask = (req, res) => {
  try {
    const {
      goalId,
      taskName,
      quantity,
      frequency,
      customReminder,
      reminders,
      reminderTime,
    } = req.body;
    const newTask = new Task({
      goalId,
      taskName,
      quantity,
      frequency,
      reminders,
      customReminder,
      reminderTime,
    });
    newTask
      .save()
      .then((task) => {
        LogController.logActivity(
          req.user.id, // Assuming user ID is stored in req.user
          goal._id,
          "Goal",
          "delete"
        );
        return res.json(task);
      })
      .catch((err) =>
        res.status(500).json({ error: "Failed to create task", err })
      );
  } catch (err) {
    res.status(500).json({ error: "Failed to create task", err });
  }
};

// controllers/taskController.js

// Update a task
exports.updateTask = (req, res) => {
  const { taskId } = req.params;

  try {
    // Check if the task exists

    // Find the task by ID
    const updatedFields = req.body.updatedFields;

    // Update the task in the database
    Task.updateOne({ _id: taskId }, { $set: updatedFields })
      .then((result) => {
        if (result.nModified === 0) {
          return res
            .status(404)
            .json({ error: "Task not found or no changes made" });
        }
        LogController.logActivity(
          req.user.id, // Assuming user ID is stored in req.user
          goal._id,
          "Task",
          "update"
        );
        res.json({ message: "Task updated successfully" });
      })
      .catch((err) =>
        res.status(500).json({ error: "Failed to update task", err })
      );
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update the Task: Body can not be empty" });
  }
};
// Get Tasks
exports.getTaskByGoalId = async (req, res) => {
  try {
    const { goalId } = req.params;
    console.log("🚀 ~ exports.getTaskByGoalId= ~ goalId:", goalId);

    const task = await Task.find({ goalId });
    console.log("🚀 ~ exports.getTaskByGoalId= ~ task:", task);
    res.json(task);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
};

// Delete a task
exports.deleteTask = (req, res) => {
  try {
    const { taskId } = req.params;

    // Check if the task exists
    Task.findById(taskId)
      .then((task) => {
        if (!task) {
          return res.status(404).json({ error: "Task not found" });
        }

        // Delete the task
        Task.deleteOne({ _id: taskId })
          .then(() => {
            LogController.logActivity(
              req.user.id, // Assuming user ID is stored in req.user
              goal._id,
              "Goal",
              "delete"
            );
            res.json({ message: "Task deleted successfully" });
          })
          .catch((err) => {
            console.error("Error deleting Task:", err);
            res.status(500).json({ error: "Failed to delete Task" });
          });
      })
      .catch((err) => {
        console.error("Error finding Task:", err);
        res.status(500).json({ error: "Failed to find Task" });
      });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};
