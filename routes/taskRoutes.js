const express = require("express");
const router = express.Router();
const passport = require("passport");
const TaskController = require("../controllers/taskController");

router.post("/", TaskController.createTask);

router.get(
  "/:goalId",
  passport.authenticate("jwt", { session: false }),
  TaskController.getTaskByGoalId
);

router.put(
  "/:taskId",
  passport.authenticate("jwt", { session: false }),
  TaskController.updateTask
);

router.delete(
  "/:taskId",
  passport.authenticate("jwt", { session: false }),
  TaskController.deleteTask
);

module.exports = router;
