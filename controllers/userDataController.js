// Import necessary models
const User = require("../models/User");

// Display user dashboard data as an API
exports.getUserDashboardData = (req, res) => {
  // Fetch user data from the database
  console.log("🚀 ~ req.user.id:", req.user.id);
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Return the fetched user data as JSON
      res.json({ username: user.username, id: user._id, email: user.email });
    })
    .catch((err) => {
      console.error("Error fetching user data:", err);
      res.status(500).json({ error: "Failed to fetch user data" });
    });
};
