const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller"); // UPDATED PATH
const auth = require("../middlewares/auth.middlewares");

// Protect semua routes dengan auth middleware
router.use(auth);

// Get dashboard data
router.get("/", dashboardController.getDashboard);

// Get timeline
router.get("/timeline", dashboardController.getTimeline);

// Get file (CV, Flazz, ID Card)
router.get("/files/:type/:filename", dashboardController.getFile);

module.exports = router;
