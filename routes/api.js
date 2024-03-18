const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const goalRoutes = require("./goalRoutes");
const taskRoutes = require("./taskRoutes");
const userDataRoutes = require("./userDataRoutes");

router.use("/auth", authRoutes);
router.use("/goals", goalRoutes);
router.use("/tasks", taskRoutes);
router.use("/", userDataRoutes);

module.exports = router;
