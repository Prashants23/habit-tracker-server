// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Passport middleware
app.use(passport.initialize());

// server.js
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Middleware for logging user activity
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Passport config
require("./config/passport")(passport);

// DB Config
const db = require("./config/config").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true }) // Remove useUnifiedTopology
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server running on port ${port}`));
