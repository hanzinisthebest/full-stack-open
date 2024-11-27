import './BlogList.css'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog,updateBlogLikes} from "../reducers/blogReducer";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";


const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

    const handleDelete = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            try {

                await dispatch(deleteBlog(blog))
                dispatch(setNotificationWithTimeout(`Removed '${blog.title}'`, 'success', 5))
            } catch (error) {
                dispatch(setNotificationWithTimeout('Failed to remove blog', 'error', 5))
            }
        }
    }

    const handleLike = async (blog) => {
        try {
            const updatedBlog = {
                ...blog,
                likes: blog.likes + 1,
            }
            await dispatch(updateBlogLikes(updatedBlog))
            dispatch(setNotificationWithTimeout(`Liked '${blog.title}'`, 'success', 5))
        } catch (error) {
            dispatch(setNotificationWithTimeout('Failed to like blog', 'error', 5))
        }
    }

    return (
        <div>
            <div className="blog-list">
                {sortedBlogs.map(blog =>
                    <div key={blog._id} className="blog-item">
                        <Link to={`/blogs/${blog._id}`} className="blog-link">
                            <h3>{blog.title}</h3>
                            <p>by {blog.author}</p>
                        </Link>
                        <div className="blog-actions">
                            <button 
                                onClick={() => handleLike(blog)}
                                className="like-button"
                            >
                                ❤️ {blog.likes}
                            </button>
                            {user && user.username === blog.user.username && (
                                <button 
                                    onClick={() => handleDelete(blog)}
                                    className="delete-button"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default BlogList