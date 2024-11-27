import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogService from '../services/blogs';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import './Blog.css';

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
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <article className="blog-content">
        <header className="blog-header">
          <h2 className="blog-title">{blog.title}</h2>
          <div className="blog-meta">
            <span className="author">By {blog.author}</span>
            <span className="separator">•</span>
            <span className="likes">
              {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
            </span>
          </div>
        </header>
        
        <div className="blog-body">
          <a href={blog.url} className="blog-url" target="_blank" rel="noopener noreferrer">
            Visit Article
          </a>
          <p className="added-by">Posted by {user ? user.name : 'unknown'}</p>
        </div>

        <section className="comments-section">
          <h3 className="comments-header">Comments</h3>
          <CommentForm onCommentAdded={handleCommentAdded} />
          <CommentList blog={blog} />
        </section>
      </article>
    </div>
  );
};

export default Blog;
