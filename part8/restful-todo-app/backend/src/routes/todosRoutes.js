const express = require('express');
const todoController = require('../controllers/todoController');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',protect, todoController.createTodo);
router.get('/',protect, todoController.getTodos);
router.put('/:id',protect, todoController.updateTodo);
router.delete('/:id',protect, todoController.deleteTodo);

module.exports = router;
