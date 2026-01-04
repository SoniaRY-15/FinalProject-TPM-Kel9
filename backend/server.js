// server.js - starts the HTTP server
try {
  require("dotenv").config();
} catch (e) {
  console.warn("dotenv not loaded, continuing without .env file");
}

const path = require("path");
const app = require(path.join(__dirname, "src", "app"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`TPM Final Project API listening on port ${PORT}`);
  console.log(`Base API: http://localhost:${PORT}/api`);
});
