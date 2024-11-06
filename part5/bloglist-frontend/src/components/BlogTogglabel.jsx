import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog,updateBlogLikes  } from '../reducers/blogReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'
const BlogTogglabel = ({ blog }) => {
    const dispatch = useDispatch()
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }  
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const handleDelete = (blog) => {
        dispatch(deleteBlog(blog))
        dispatch(setNotificationWithTimeout(`blog ${blog.title} by ${blog.author} removed`, 5))
    }

    const LikeBlog = (blogObject) => {
        dispatch(updateBlogLikes(blogObject))
        dispatch(setNotificationWithTimeout(`blog ${blogObject.title} by ${blogObject.author} updated`, 5))
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author}
                <button onClick={toggleVisibility} data-testid={`${visible? 'hide' : 'view'}-${blog.title}`}>{visible ? 'hide' : 'view'}</button>
                <button onClick={() => handleDelete(blog)} data-testid={`remove-${blog.title}`}>remove</button>
            </div>
        
            <div style={showWhenVisible} className='togglableBlog'>
                <div>{blog.url}</div>
                <div>likes {blog.likes}<button onClick={() => LikeBlog({ id: blog._id, title: blog.title, author: blog.author, url: blog.url, likes: blog.likes + 1 })} data-testid={`like-${blog.title}`}>like</button></div>
            </div>
            
        </div>
    )

}

export default BlogTogglabel