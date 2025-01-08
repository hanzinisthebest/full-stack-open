const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from the database
      const user = await User.findById(decoded.id).select('-password'); // Exclude the password

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Attach the full user object to req.user
      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};


const admin = (req, res, next) => {
  console.log('User:', req.user)
  
  if (req.user && req.user.isAdmin) {
    next(); // Proceed if user is an admin
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};

module.exports = { protect, admin };
