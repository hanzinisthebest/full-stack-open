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
                <button onClick={toggleVisibility} data-testid={`${visible? 'hide' : 'view'}-${blog.title}`}>{visible ? 'hide' : 'view'}</button>
                <button onClick={() => deleteBlog(blog)} data-testid={`remove-${blog.title}`}>remove</button>
            </div>
        
            <div style={showWhenVisible} className='togglableBlog'>
                <div>{blog.url}</div>
                <div>likes {blog.likes}<button onClick={() => updateBlog({ ...blog, likes: blog.likes + 1 })} data-testid={`like-${blog.title}`}>like</button></div>
            </div>
            
        </div>
    )

}

export default BlogTogglabel