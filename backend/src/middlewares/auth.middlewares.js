const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: 'Authorization header tidak ditemukan',
      });
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      return res.status(401).json({
        message: 'Format Authorization salah (Bearer <token>)',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { teamId, role, iat, exp }

    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Token tidak valid atau expired',
    });
  }
};
