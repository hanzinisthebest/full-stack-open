import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        }
    }   
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blogObject) => {
    return async dispatch => {
        const newBlog = await blogService.create(blogObject)
        dispatch(appendBlog(newBlog))
    }
}

export const updateBlogLikes = (blogObject) => {
    return async dispatch => {
        await blogService.update(blogObject._id, blogObject)
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const deleteBlog = (blogObject) => {
    return async dispatch => {
        await blogService.remove(blogObject._id)
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const addCommentRedux = (id, comment) => {
    return async dispatch => {
        await blogService.addComment(id, comment)
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

// export const getBlogById = (id) => {
//     return async dispatch => {
//         const blog = await blogService.getById(id)
//         dispatch(setBlog(blog))
//     }
// }
export default blogSlice.reducer
    