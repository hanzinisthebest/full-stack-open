import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogFormWrapper = ({ blogFormRef }) => {
  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )
}

export default BlogFormWrapper 