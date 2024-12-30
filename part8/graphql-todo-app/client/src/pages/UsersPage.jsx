import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../queries';

function UsersPage() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {data.getUsers.map((user) => (
          <li key={user.id}>
            {user.username} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersPage;
