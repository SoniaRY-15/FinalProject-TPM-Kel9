// Centralized error handling stuff

function errorHandler(err, req, res, next) {
  console.error("Unhandled error:", err && err.stack ? err.stack : err);

  const isProd = process.env.NODE_ENV === "production";
  const status = (err && err.status) || 500;
  const message = (err && err.message) || "Internal Server Error";

  const payload = {
    success: false,
    message,
  };

  if (!isProd) {
    payload.error = err;
  }

  res.status(status).json(payload);
}

module.exports = errorHandler;
