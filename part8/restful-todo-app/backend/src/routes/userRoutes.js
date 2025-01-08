const express = require('express');
const userController = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', protect, admin, userController.getAllUsers);
router.get('/profile', protect, userController.getProfile);

module.exports = router;