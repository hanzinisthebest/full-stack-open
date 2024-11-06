import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../reducers/blogReducer";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";
import BlogTogglabel from "./BlogTogglabel";


const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    return (
        <div>
            <h2>blogs</h2>
            <ul>
                {sortedBlogs.map(blog =>
                    <li key={blog._id}>
                        <BlogTogglabel blog={blog}/>
                    </li>
                )}
            </ul>
        </div>
    )
}
export default BlogList