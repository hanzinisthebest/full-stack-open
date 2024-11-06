import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
const BlogForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const dispatch = useDispatch();

    const addBlog = (event) => {
        event.preventDefault()
        dispatch(createBlog({ title, author, url }))
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
        <form onSubmit={addBlog}>
            <div>
                title
                <input
                    type="text"
                    placeholder='title'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>   
                author  
                <input      
                    value={author}
                    placeholder='author'
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url
                <input
                    type="text"
                    placeholder='url'
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm