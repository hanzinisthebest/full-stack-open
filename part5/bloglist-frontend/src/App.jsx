import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogTogglabel from './components/BlogTogglabel'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from "react-redux";
import { setNotificationWithTimeout} from "./reducers/notificationReducer"
import Notification from './components/Notification'
import {initializeBlogs,updateBlogLikes,deleteBlog} from "./reducers/blogReducer"
const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  // const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const blogs = useSelector(state => state.blogs)
  useEffect(() => {
    // blogService.getAll().then(blogs =>
    //   setBlogs( blogs )
    // )
    dispatch(initializeBlogs())
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




  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm/>
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
      {user === null ? null : <BlogList
        blogs={blogs}/>}
    </div>
  )
}

export default App