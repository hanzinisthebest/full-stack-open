const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generateToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      };

const registerUser = async (req, res) => {
        const { username, email, password, isAdmin } = req.body; // Include isAdmin in destructuring
      
        try {
          // Create the user with the isAdmin field
          const user = await User.create({ 
            username, 
            email, 
            password, 
            isAdmin: isAdmin || false // Default to false if not provided
          });
      
          // Generate a token
          const token = generateToken(user.id);
      
          // Respond with the token
          res.status(201).json({ token });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
    };

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = generateToken(user.id);
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

//Admin olny
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getProfile
}


