import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogService from '../services/blogs';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
const Blog = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const user = useSelector(state => state.user)

  // Add this function to update the blog state with new comment
  const handleCommentAdded = (newComment) => {
    setBlog({
      ...blog,
      comments: [...blog.comments, newComment]
    });
  };

  useEffect(() => {
    blogService.getById(id).then((data) => setBlog(data));
  }, [id]);


  if (!blog) {
    return <div>Loading...</div>; // Show a loading message while fetching
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>
        URL: <a href={blog.url}>{blog.url}</a>
      </p>
      <p>Likes: {blog.likes}</p>
      <p>Added by: {user?user.name : 'unknown'}</p>
      <h3>Comments</h3>
      <CommentForm onCommentAdded={handleCommentAdded}/>
      <CommentList blog={blog} />
      {/* <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Blog;
