import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../reducers/blogReducer";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";


const BlogList = () => {

    const blogs = useSelector(state => state.blogs)
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    // console.log(sortedBlogs)
    return (
        <div>
            <h2>blogs</h2>
            <ul>
                {sortedBlogs.map(blog =>
                    <li key={blog._id}>
                    <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                   </li>
                )}
            </ul>
        </div>
    )
}
export default BlogList