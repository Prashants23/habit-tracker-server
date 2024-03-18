const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserDataContainer = require("../controllers/userDataController");

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  UserDataContainer.getUserDashboardData
);

module.exports = router;
