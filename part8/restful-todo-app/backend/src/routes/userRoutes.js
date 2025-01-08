const express = require('express');
const userController = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users', protect,admin, userController.getAllUsers);

module.exports = router;