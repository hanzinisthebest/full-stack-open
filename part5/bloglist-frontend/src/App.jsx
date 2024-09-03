import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
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
      // noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {  
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
  }

  const addBlog = () => {
    event.preventDefault()
    const blogObject = {
      title: title, 
      author: author,
      url: url
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      }).catch(error => {
        setErrorMessage("something went wrong")
      })

  }
  const blogForm = () => {
    return (
      <form onSubmit={addBlog}>
        <div>
          title 
            <input 
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author
            <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url   
            <input 
             value={url}
             onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
    )
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
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
      {blogs.map(blog =>
        <Blog key={blog._id} blog={blog} />
      )}
    </div>
  )
}

export default App