import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/users'; // Service to fetch users

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAllUsers().then(data => setUsers(data));
  }, []);

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  };

  const thStyle = {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd'
  };

  const tdStyle = {
    padding: '8px',
    borderBottom: '1px solid #ddd'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#0066cc',
    ':hover': {
      textDecoration: 'underline'
    }
  };

  return (
    <div>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Users</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} style={{ ':hover': { backgroundColor: '#f5f5f5' } }}>
              <td style={tdStyle}>
                <Link style={linkStyle} to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td style={tdStyle}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
