import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, deleteUser } from '../api/users';

const AdminPanel = () => {
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users, isLoading } = useQuery({queryKey: ['users'], queryFn: fetchUsers});

  // Mutation for deleting a user
  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email})
            <button onClick={() => deleteUserMutation.mutate(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
