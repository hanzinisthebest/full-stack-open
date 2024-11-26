import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'

const modalStyles = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  content: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginTop: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  label: {
    fontWeight: 'bold',
    color: '#333'
  },
  button: {
    backgroundColor: '#0066cc',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer'
  }
}

const errorStyle = {
  color: 'red',
  fontSize: '0.8rem',
  marginTop: '0.25rem',
  marginBottom: '0.5rem'
}

const BlogForm = ({ onClose }) => {
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}
        if (!title.inputProps.value.trim()) {
            newErrors.title = 'Title is required'
        }
        if (!author.inputProps.value.trim()) {
            newErrors.author = 'Author is required'
        }
        if (!url.inputProps.value.trim()) {
            newErrors.url = 'URL is required'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const addBlog = (event) => {
        event.preventDefault()
        if (validateForm()) {
          dispatch(createBlog({
              title: title.inputProps.value,
              author: author.inputProps.value,
              url: url.inputProps.value
          }))
          title.reset()
          author.reset()
          url.reset()
          onClose()
      } 
    }

    const handleModalClick = (event) => {
      // Close only if clicking the outer modal container, not its contents
      if (event.target === event.currentTarget) {
          onClose()
      }
  }
    return (
        <div style={modalStyles.modal} onClick={handleModalClick}>
            <div style={modalStyles.content}>
                <button onClick={onClose} style={modalStyles.closeButton}>×</button>
                <h2 style={{ marginBottom: '1.5rem' }}>Create New Blog</h2>
                <form onSubmit={addBlog}>
                    <div>
                        <label style={modalStyles.label}>Title</label>
                        <input {...title.inputProps} style={modalStyles.input} />
                        {errors.title && <div style={errorStyle}>{errors.title}</div>}
                    </div>
                    <div>
                        <label style={modalStyles.label}>Author</label>
                        <input {...author.inputProps} style={modalStyles.input} />
                        {errors.author && <div style={errorStyle}>{errors.author}</div>}
                    </div>
                    <div>
                        <label style={modalStyles.label}>URL</label>
                        <input {...url.inputProps} style={modalStyles.input} />
                        {errors.url && <div style={errorStyle}>{errors.url}</div>}
                    </div>
                    <button type="submit" style={modalStyles.button}>Create Blog</button>
                </form>
            </div>
        </div>
    )
}

export default BlogForm