import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
const BlogForm = () => {
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')
    const dispatch = useDispatch();

    const addBlog = (event) => {
        event.preventDefault()
        dispatch(createBlog({ title: title.inputProps.value, author: author.inputProps.value, url: url.inputProps.value }))
        title.reset()
        author.reset()
        url.reset()
    }
    return (
        <form onSubmit={addBlog}>
            <div>
                title
                <input {...title.inputProps} />
            </div>
            <div>   
                author  
                <input {...author.inputProps}/>
            </div>
            <div>
                url
                <input
                    {...url.inputProps}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm