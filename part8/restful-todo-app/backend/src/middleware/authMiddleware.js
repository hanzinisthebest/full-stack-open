const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized, no token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ message: 'Unauthorized, token failed' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // Proceed if user is an admin
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};

module.exports = { protect, admin };
