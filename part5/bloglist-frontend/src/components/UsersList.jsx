import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/users';
import './UsersList.css';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAllUsers().then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h2 className="title">Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="th">Name</th>
            <th className="th">Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="tableRow">
              <td className="td">
                <Link className="link" to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td className="td">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
