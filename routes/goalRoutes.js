const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoalController = require("../controllers/goalController");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  GoalController.createGoal
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  GoalController.getGoals
);

router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  GoalController.updateGoal
);

router.delete(
  "/:goalId",
  passport.authenticate("jwt", { session: false }),
  GoalController.deleteGoal
);

module.exports = router;
