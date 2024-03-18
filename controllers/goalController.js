// controllers/goalController.js
const Goal = require("../models/Goal");
const User = require("../models/User");
const Task = require("../models/Task");
const LogController = require("./logController");

// @desc    Create a new goal
exports.createGoal = (req, res) => {
  try {
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
        User.findByIdAndUpdate(
          userId,
          { $push: { goals: goal._id } },
          { new: true }
        )
          .then(() => {
            LogController.logActivity(userId, goal._id, "Goal", "Create");
            return res.json(goal);
          })
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
  } catch (error) {
    res.status(500).json({ error: "Failed to save new goal" });
  }
};

// get goals

exports.getGoals = async (req, res) => {
  try {
    const userId = req.user.id;
    const goals = await Goal.find({ userId });

    for (let i = 0; i < goals.length; i++) {
      const goal = goals[i];

      const tasks = await Task.find({ goalId: goal._id });

      // Calculate completed tasks percentage
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter((task) => task.completed).length;
      const completionPercentage =
        totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
      goal.completedPercentage = completionPercentage;
    }
    res.json(goals);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json({ error: "Failed to fetch goals" });
  }
};

// Update a goal niot being used as of now and is not complete
exports.updateGoal = (req, res) => {
  try {
    const {
      updatedFields: { goalName, minTimeline, maxTimeline, completed },
      goalId,
    } = req.body;

    Goal.findById(goalId)
      .then((goal) => {
        if (!goal) {
          return res.status(404).json({ error: "Goal not found" });
        }

        goal.goalName = goalName;
        goal.minTimeline = minTimeline;
        goal.maxTimeline = maxTimeline;
        goal.completed = completed;

        // Save the updated goal
        goal
          .save()
          .then((updatedGoal) => {
            LogController.logActivity(
              req.user.id, // Assuming user ID is stored in req.user
              goal._id,
              "Goal",
              "update"
            );
            return res.json(updatedGoal);
          })
          .catch((err) => {
            console.error("Error updating goal:", err);
            res.status(500).json({ error: "Failed to update goal" });
          });
      })
      .catch((err) => {
        console.error("Error finding goal:", err);
        res.status(500).json({ error: "Failed to find goal" });
      });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to find goal: there was some error" });
  }
};

// Delete a goal
exports.deleteGoal = async (req, res) => {
  const { goalId } = req.params;

  Goal.findById(goalId)
    .then((goal) => {
      if (!goal) {
        return res.status(404).json({ error: "Goal not found" });
      }

      // Delete the goal
      Goal.deleteOne({ _id: goalId })
        .then(() => {
          LogController.logActivity(
            req.user.id, // Assuming user ID is stored in req.user
            goal._id,
            "Goal",
            "delete"
          );
          return res.json({ message: "Goal deleted successfully" });
        })
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
