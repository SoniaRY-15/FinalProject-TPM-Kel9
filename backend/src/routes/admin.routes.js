const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin.controller");

router.get("/participants", auth, adminController.getAllParticipants);

router.get("/participants/:teamId", auth, adminController.getTeamDetails);

router.put("/participants/:teamId", auth, adminController.editTeam);

router.delete("/participants/:teamId", auth, adminController.deleteTeam);

module.exports = router;
