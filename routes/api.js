// routes/api.js
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load User and Goal models
const UserController = require("../controllers/userController");
const TaskController = require("../controllers/taskController");
const GoalController = require("../controllers/goalController");
// const Goal = require("../models/Goal");
// const Task = require("../models/Task");

router.post("/users/signup", UserController.signup);
router.post("/users/login", UserController.login);
router.post(
  "/goals",
  passport.authenticate("jwt", { session: false }),
  GoalController.createGoal
);

router.get(
  "/goals",
  passport.authenticate("jwt", { session: false }),
  GoalController.getGoals
);

router.put(
  "/goals/update",
  passport.authenticate("jwt", { session: false }),
  GoalController.updateGoal
);

router.delete(
  "/goals/:goalId",
  passport.authenticate("jwt", { session: false }),
  GoalController.deleteGoal
);

router.post("/tasks", TaskController.createTask);

router.put(
  "/tasks/:taskId",
  passport.authenticate("jwt", { session: false }),
  TaskController.updateTask
);
router.delete(
  "/tasks/:taskId",
  passport.authenticate("jwt", { session: false }),
  TaskController.deleteTask
);
// router.post("/users/task", TaskController.createTask);

module.exports = router;
