// controllers/goalController.js
const Goal = require("../models/Goal");
const User = require("../models/User");

// @desc    Create a new goal
exports.createGoal = (req, res) => {
  const { goalName, minTimeline, maxTimeline, completed = false } = req.body;
  const userId = req?.user?.id;
  console.log("Hello world", req.user, req);

  // Create a new goal
  const newGoal = new Goal({
    userId,
    goalName,
    minTimeline,
    maxTimeline,
    completed,
  });

  // Save the goal to the database
  newGoal
    .save()
    .then((goal) => {
      // Once the goal is saved, add its ID to the user's goals array

      User.findByIdAndUpdate(
        userId,
        { $push: { goals: goal._id } },
        { new: true }
      )
        .then(() => res.json(goal))
        .catch((err) => {
          console.error("Error updating user with new goal:", err);
          res
            .status(500)
            .json({ error: "Failed to update user with new goal" });
        });
    })
    .catch((err) => {
      console.error("Error saving new goal:", err);
      res.status(500).json({ error: "Failed to save new goal" });
    });
};

// get goals

exports.getGoals = async (req, res) => {
  try {
    const userId = req.user.id;
    const goals = await Goal.find({ userId });
    res.json(goals);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json({ error: "Failed to fetch goals" });
  }
};

// Update a goal
exports.updateGoal = (req, res) => {
  // const { goalId } = req.params;
  // console.log("🚀 ~ goalId:", req.params);
  const {
    updatedFields: { goalName, minTimeline, maxTimeline, completed },
    goalId,
  } = req.body;

  // Check if the goal exists
  Goal.findById(goalId)
    .then((goal) => {
      if (!goal) {
        return res.status(404).json({ error: "Goal not found" });
      }

      // Update goal fields
      goal.goalName = goalName;
      goal.minTimeline = minTimeline;
      goal.maxTimeline = maxTimeline;
      goal.completed = completed;

      // Save the updated goal
      goal
        .save()
        .then((updatedGoal) => res.json(updatedGoal))
        .catch((err) => {
          console.error("Error updating goal:", err);
          res.status(500).json({ error: "Failed to update goal" });
        });
    })
    .catch((err) => {
      console.error("Error finding goal:", err);
      res.status(500).json({ error: "Failed to find goal" });
    });
};

// Delete a goal
exports.deleteGoal = async (req, res) => {
  const { goalId } = req.params;
  console.log("🚀 ~ goalId:", goalId);
  // Check if the goal exists
  Goal.findById(goalId)
    .then((goal) => {
      if (!goal) {
        return res.status(404).json({ error: "Goal not found" });
      }

      // Delete the goal
      Goal.deleteOne({ _id: goalId })
        .then(() => res.json({ message: "Goal deleted successfully" }))
        .catch((err) => {
          console.error("Error deleting goal:", err);
          res.status(500).json({ error: "Failed to delete goal" });
        });
    })
    .catch((err) => {
      console.error("Error finding goal:", err);
      res.status(500).json({ error: "Failed to find goal" });
    });
};

// controllers/goalController.js

// Get progress of a goal
exports.getGoalProgress = (req, res) => {
  const { goalId } = req.params;

  // Find the goal by ID
  Goal.findById(goalId)
    .populate("tasks") // Populate tasks associated with the goal
    .then((goal) => {
      if (!goal) {
        return res.status(404).json({ error: "Goal not found" });
      }

      // Calculate progress metrics
      const totalTasks = goal.tasks.length;
      const completedTasks = goal.tasks.filter((task) => task.completed).length;
      const progressPercentage =
        totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

      // Calculate remaining time, if applicable
      const currentDate = new Date();
      const daysLeft = Math.ceil(
        (goal.maxTimeline - currentDate.getDate()) / 86400000
      );

      res.json({
        totalTasks,
        completedTasks,
        progressPercentage,
        daysLeft,
      });
    })
    .catch((err) => {
      console.error("Error finding goal:", err);
      res.status(500).json({ error: "Failed to find goal" });
    });
};
