const express = require("express");
const corsMiddleware = require("./config/cors");
const landingRoutes = require("./routes/landing.routes");
const errorHandler = require("./middlewares/errorHandler");
const teamRoutes = require("./routes/team.routes.js");
const leaderRoutes = require("./routes/leader.routes.js")
const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json()); 
app.use('/api/team', teamRoutes);
app.use('/api/leader',leaderRoutes);
// Health-check
app.get("/api/health", (req, res) => {
  res.json({ success: true, uptime: process.uptime() });
});

// Mount landing routes under /api
app.use("/api", landingRoutes);

// Centralized error handler (after routes)
app.use(errorHandler);



module.exports = app;
