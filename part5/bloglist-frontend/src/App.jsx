import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from "react-redux";
import { setNotificationWithTimeout} from "./reducers/notificationReducer"
import Notification from './components/Notification'
import {initializeBlogs,updateBlogLikes,deleteBlog} from "./reducers/blogReducer"
import { setUser, logout } from "./reducers/userReducer"

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  // const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

 
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    // console.log(user);
    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])



  const handleLogout = () => {
    dispatch(logout())
    // console.log(user);
    
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
      <LoginForm/>
    </Togglable>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      {errorMessage !== null && <div className="error">{errorMessage}</div>}
      <Notification/>
      {user === null ? <p>log in to application</p> : <div><p>{user?.name} is logged in</p> <button onClick={handleLogout}>logout</button></div>}
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