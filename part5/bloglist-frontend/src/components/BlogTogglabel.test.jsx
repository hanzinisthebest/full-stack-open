import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogTogglabel from './BlogTogglabel'
import { beforeEach, expect } from 'vitest'

describe('<BlogTogglabel />', () => {
    let container
    const blog = {
        title: 'test title',
        author: 'test author',
        url: 'test url',
        likes: 0
    }
    const mockHandleLike = vi.fn()
    const mockHandleDelete = vi.fn()
    beforeEach(() => {
        container = render(<BlogTogglabel blog={blog} updateBlog = {mockHandleLike} deleteBlog = {mockHandleDelete}/>).container
    })
    it('renders content', () => {
        const element = screen.getByText('test title test author') 
        expect(element).toBeDefined()
    })

    it('at start the children are not displayed', () => {
        const div = container.querySelector('.togglableBlog')
        expect(div).toHaveStyle('display: none')
    })

    it('after clicking the button children are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        const div = container.querySelector('.togglableBlog')
        expect(div).not.toHaveStyle('display: none')
    })

    it('after clicking the button twice children are not displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        await user.click(button)
        const div = container.querySelector('.togglableBlog')
        expect(div).toHaveStyle('display: none')
    })

    it ('clicking the like button twice calls event handler twice', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)
        expect(mockHandleLike.mock.calls).toHaveLength(2)
        expect(mockHandleLike.mock.calls[0][0]).toEqual({ ...blog, likes: 1 })
    })

    it ('clicking the remove button calls event handler', async () => {
        const user = userEvent.setup()
        const removeButton = screen.getByText('remove')
        await user.click(removeButton)
        expect(mockHandleDelete.mock.calls).toHaveLength(1)
        expect(mockHandleDelete.mock.calls[0][0]).toEqual(blog)
    })


})