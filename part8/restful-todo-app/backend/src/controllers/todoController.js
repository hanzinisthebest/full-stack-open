const Todo = require('../models/Todo');

// Get Todos for a User
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a Todo
exports.createTodo = async (req, res) => {
  const { text } = req.body;
  try {
    const todo = new Todo({ text, userId: req.user.id });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a Todo
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { text, completed },
      { new: true }
    );
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// // complete a Todo
// exports.completeTodo = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const todo = await Todo.findByIdAndUpdate(
//       id,
//       { completed: true },
//       { new: true }
//     );
//     res.status(200).json(todo);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// Delete a Todo
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
