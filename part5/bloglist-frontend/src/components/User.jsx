import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/users'; // Service to fetch users
import BlogList from './BlogList';
const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    userService.getById(id).then(data => setUser(data));
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{user.name} blogs</h2>
      {/* <h3>Blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul> */}
      <BlogList blogs={user.blogs} />
    </div>
  );
};

export default User;
