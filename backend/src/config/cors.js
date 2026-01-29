const cors = require("cors");

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

const corsOptions = {
  origin: allowedOrigin,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

module.exports = cors(corsOptions);
