import apiClient from './client';

// Fetch all users (Admin)
export const fetchUsers = async () => {
  const { data } = await apiClient.get('/users');
  return data;
};

// Delete a user (Admin)
export const deleteUser = async (id) => {
  await apiClient.delete(`/users/${id}`);
};

// Login user
export const loginUser = async (credentials) => {
  const { data } = await apiClient.post('/users/login', credentials);
  return data;
};
