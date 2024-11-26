import Togglable from './Togglable'
import BlogForm from './BlogForm'
import './BlogFormWrapper.css'

const BlogFormWrapper = ({ blogFormRef }) => {
  const handleClose = () => {
    blogFormRef.current.toggleVisibility()
  }
  return (
    <Togglable buttonLabel={<span className="plus-icon">+</span>} ref={blogFormRef}>
      <BlogForm onClose={handleClose} />
    </Togglable>
  )
}

export default BlogFormWrapper 