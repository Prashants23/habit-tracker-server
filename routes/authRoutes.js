const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserController = require("../controllers/authController");

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);

module.exports = router;
