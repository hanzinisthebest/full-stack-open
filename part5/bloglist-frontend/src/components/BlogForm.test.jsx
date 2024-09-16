import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { describe } from 'vitest'
describe('<BlogForm />', () => {
    test('a new blog can be created', async () => {
        const mockHandler = vi.fn()
        const user = userEvent.setup()
        render(<BlogForm createBlog={mockHandler} />)
    
        const title = screen.getByPlaceholderText('title')
        const author = screen.getByPlaceholderText('author')
        const url = screen.getByPlaceholderText('url')
    
        await user.type(title, 'test title')    
        await user.type(author, 'test author')
        await user.type(url, 'test url')
    
        const button = screen.getByText('create')
    
        await user.click(button)
    
        expect(mockHandler.mock.calls).toHaveLength(1)
        expect(mockHandler.mock.calls[0][0]).toEqual({
            title: 'test title',
            author: 'test author',
            url: 'test url'
        })
    })
    
})