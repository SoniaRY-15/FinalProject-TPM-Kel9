const express = require("express");
const router = express.Router();
const landingController = require("../controllers/landing.controller");

/*
GET /api/landing
Returns all data needed for the landing page.
*/
router.get("/landing", landingController.getLanding);

/*
POST /api/contact
Accepts contact form submissions (metadata only).
*/

router.post("/contact", landingController.postContact);

module.exports = router;
