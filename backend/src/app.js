const express = require("express");
const path = require("path");
const fs = require("fs");
const corsMiddleware = require("./config/cors");
const landingRoutes = require("./routes/landing.routes");
const errorHandler = require("./middlewares/errorHandler");
const teamRoutes = require("./routes/team.routes.js");
const leaderRoutes = require("./routes/leader.routes.js");
const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use("/api/team", teamRoutes);
app.use("/api/leader", leaderRoutes);

// Health-check
app.get("/api/health", (req, res) => {
  res.json({ success: true, uptime: process.uptime() });
});

// Mount landing routes under /api
app.use("/api", landingRoutes);

// Serve built frontend (if present) and SPA fallback
// This avoids using a '*' route pattern that path-to-regexp may reject.
const distPath = path.join(__dirname, "..", "..", "frontend", "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // SPA fallback: for any non-API request, return index.html
  app.use((req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Centralized error handler (after routes)
app.use(errorHandler);

module.exports = app;
