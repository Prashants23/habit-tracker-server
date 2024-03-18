// Import necessary models
const User = require("../models/User");

// Display user dashboard data as an API
exports.getUserDashboardData = (req, res) => {
  // Fetch user data from the database
  User.findById(req.user.id)
    .populate({
      path: "goals",
      populate: {
        path: "tasks",
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return the fetched user data as JSON
      res.json({ user });
    })
    .catch((err) => {
      console.error("Error fetching user data:", err);
      res.status(500).json({ error: "Failed to fetch user data" });
    });
};
