const express = require("express");
const router = express.Router();
const landingController = require("../controllers/landing.controller");

router.get("/landing", landingController.getLanding);
router.get("/landing/:section", landingController.getLandingSection);
router.post("/contact", landingController.postContact);

module.exports = router;
