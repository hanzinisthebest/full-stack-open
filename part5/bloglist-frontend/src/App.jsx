import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogTogglabel from './components/BlogTogglabel'
const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userData) => {  

    try {
      console.log(userData);
      
      const user = await loginService.login(userData)
      console.log(user);
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setMessage(`Welcome ${user.username}`)
      
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    setMessage('You have been logged out')
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      }).catch(error => {
        setErrorMessage("something went wrong")
      })

  }

  const updateBlog = (blogObject) => {
    blogService
      .update(blogObject._id,blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog._id !== returnedBlog._id ? blog : returnedBlog))
      })
  }

  const deleteBlog = (blogObject) => {
    const ok = window.confirm(`remove blog ${blogObject.title} by ${blogObject.author}?`)
    if (!ok) {
      return 
    }
    blogService.
      remove(blogObject._id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog._id !== blogObject._id))
        setMessage(`blog ${blogObject.title} deleted`)
      }) 
  }
  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
          />
      </Togglable>        
    )
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='log in'>
      <LoginForm
        handleLogin={handleLogin}
      />
    </Togglable>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      {errorMessage !== null && <div className="error">{errorMessage}</div>}
      {message !== null && <div className="message">{message}</div>}
      {user === null ? <p>log in to application</p> : <div><p>{user.name} logged in</p> <button onClick={handleLogout}>logout</button></div>}
      {user === null ?
        loginForm() :
        blogForm()
      }
      {user === null ? null :
      blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <BlogTogglabel key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />)}
    </div>
  )
}

export default App