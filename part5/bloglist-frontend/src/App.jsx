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
import  Users from './components/UsersList'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import { Link, Routes, Route   } from 'react-router-dom'
import BlogFormWrapper from './components/BlogFormWrapper'
import LoginFormWrapper from './components/LoginFormWrapper'
import LoginStatus from './components/LoginStatus'

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
  }




  return (
    <div>
      <Navigation onLogout={handleLogout}/>
      <LoginStatus  />
      <Notification />
      <Routes>
        <Route path='/' element={user === null ?
          <LoginFormWrapper /> :
          <div>
            <BlogFormWrapper blogFormRef={blogFormRef} />
            <BlogList blogs={blogs}/>
          </div>
        }></Route>
        <Route path="/users" element={user === null ? <LoginFormWrapper /> :<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App