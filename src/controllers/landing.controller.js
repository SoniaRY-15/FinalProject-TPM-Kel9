// Controller for landing page endpoints (GET /api/landing, POST /api/contact)
const landingData = require("../data/landing.data");
const { success, fail } = require("../utils/response");
const { isValidEmail } = require("../utils/validators");

/*
GET /api/landing
Returns the entire landing page payload (dummy, in-memory).
*/

function getLanding(req, res, next) {
  try {
    // Return the full landing object
    return success(res, landingData, "Landing data fetched successfully", 200);
  } catch (err) {
    // Forward to centralized error handler
    return next(err);
  }
}

/*
POST /api/contact
Validates incoming contact form metadata and simulates sending an email.
Expected body: { name, email, subject, message }
*/

async function postContact(req, res, next) {
  try {
    const { name, email, subject, message } = req.body || {};

    // Validate required fields
    const missing = [];
    if (!name) missing.push("name");
    if (!email) missing.push("email");
    if (!subject) missing.push("subject");
    if (!message) missing.push("message");

    if (missing.length > 0) {
      return fail(res, `Missing required field(s): ${missing.join(", ")}`, 400);
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return fail(res, "Invalid email format", 400);
    }

    // Simulate sending email (no real email sent)
    console.log("Simulating sending contact email:");
    console.log({
      to: landingData.contact.contactEmail,
      from: email,
      name,
      subject,
      message,
    });

    // Simulate async operation latency
    await new Promise((resolve) => setTimeout(resolve, 250));

    return res.status(200).json({
      success: true,
      message: "Message successfully sent",
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getLanding,
  postContact,
};
