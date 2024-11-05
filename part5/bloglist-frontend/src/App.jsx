import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogTogglabel from './components/BlogTogglabel'
import { useDispatch } from "react-redux";
import { setNotificationWithTimeout} from "./reducers/notificationReducer"
import Notification from './components/Notification'
const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
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
      dispatch(setNotificationWithTimeout(`welcome ${user.name}`, 5))
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
    dispatch(setNotificationWithTimeout('you are logged out', 5))
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        dispatch(setNotificationWithTimeout(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 5))
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
        dispatch(setNotificationWithTimeout(`blog ${blogObject.title} by ${blogObject.author} removed`, 5))
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
      <Notification/>
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