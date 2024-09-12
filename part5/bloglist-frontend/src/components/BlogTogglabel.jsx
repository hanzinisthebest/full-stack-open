import { useState } from 'react'
const BlogTogglabel = ({ blog, updateBlog, deleteBlog }) => {

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

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author}
                <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
                <button onClick={() => deleteBlog(blog)}>remove</button>
            </div>
        
            <div style={showWhenVisible}>
                <div>{blog.url}</div>
                <div>likes {blog.likes}<button onClick={() => updateBlog({ ...blog, likes: blog.likes + 1 })}>like</button></div>
            </div>
            
        </div>
    )

}

export default BlogTogglabel