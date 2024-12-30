const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Todo = require('../models/todo');
const User = require('../models/user');

const resolvers = {
  Query: {
    todos: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return Todo.find({ user: user.id });
    },
    users: async (_, __, { user }) => {
      if (!user || user.role !== 'admin') throw new Error('Not authorized');
      return User.find();
    },
    getCurrentUser: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return User.findById(user.id);
    },
  },
  Mutation: {
    addTodo: async (_, { title }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      const todo = new Todo({
        title,
        completed: false,
        user: user.id,
      });
      return todo.save();
    },
    updateTodo: async (_, { id, completed }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      const todo = await Todo.findOne({ _id: id, user: user.id });
      if (!todo) throw new Error('Todo not found');
      todo.completed = completed;
      return todo.save();
    },
    deleteTodo: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      const result = await Todo.findOneAndDelete({ _id: id, user: user.id });
      return !!result;
    },
    register: async (_, { username, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      // // Default the role to 'user' if not provided
      // const userRole = role || 'user';
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign({ id: newUser.id}, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return { user: newUser, token };
    },
    
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error('User not found');
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Incorrect password');
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      return { user: { ...user._doc }, token };
    },
    
    deleteUser: async (_, { id }, { user }) => {
      if (!user || user.role !== 'admin') throw new Error('Not authorized');
      const result = await User.findByIdAndDelete(id);
      return !!result;
    },
  },
};

module.exports = resolvers;
