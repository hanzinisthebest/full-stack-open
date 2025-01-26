import apiClient from './client';

// Fetch all todos
export const fetchTodos = async () => {
  const { data } = await apiClient.get('/todos/');
  return data;
};

// Toggle todo completion
export const toggleTodo = async (id) => {
  await apiClient.patch(`/todos/${id}/toggle`);
};

// Create a new todo
export const createTodo = async (todo) => {
  const { data } = await apiClient.post('/todos', todo);
  return data;
};

// Delete a todo
export const deleteTodo = async (id) => {
  await apiClient.delete(`/todos/${id}`);
};
