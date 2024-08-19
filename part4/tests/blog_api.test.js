const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const test_helper = require('./test_helper')
describe('when there is initially some blogs saved', () => {
    
    beforeEach(async () => {
        await Blog.deleteMany({})
        for (let blog of test_helper.initialBlogs) {
            let blogObject = new Blog(blog)
            await blogObject.save()
        }
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, test_helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const titles = response.body.map(r => r.title)
       assert(titles.includes('React patterns'))

    })

  describe('viewing a specific blog' , () => {
    test('succeeds with a valid id', async () => {
        const blogsAtStart = await test_helper.blogsInDb()

        const blogToView = blogsAtStart[0]  

        const resultBlog = await api
            .get(`/api/blogs/${blogToView._id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // Convert the actual _id to string before the assertion
        blogToView._id = blogToView._id.toString()
        
        assert.deepStrictEqual(resultBlog.body, blogToView)
    })

   test('fails with status code 404 if blog does not exist', async () => {
        const validNonexistingId = await test_helper.nonExistingId()   

        await api
            .get(`/api/blogs/${validNonexistingId}`)
            .expect(404)
    })

    test('fails with status code 400 id is invalid', async () => {
        const invalidId = '5a3d5da590700267a0ce'

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })

})

describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
        const newBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12
        }  

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await test_helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, test_helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(b => b.title)

        assert(titles.includes('Canonical string reduction'))

    })

    test('if there is no likes property, defaults to 0', async () => {
        const newBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        assert.strictEqual(response.body.likes, 0)
    })
})

describe('updating a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
        const blogsAtStart = await test_helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        blogToUpdate.likes = blogToUpdate.likes + 1

        await api
            .put(`/api/blogs/${blogToUpdate._id}`)
            .send(blogToUpdate)
            .expect(200)    

    
})

    test('fails with status code 400 if id is invalid', async () => {
        const invalidId = '5a3d5da590700267a0ce'

        const invalidBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12
        }
        await api
            .put(`/api/blogs/${invalidId}`)
            .send(invalidBlog)
            .expect(400)
    })
})


describe('deletion of a note', () => {
  
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await test_helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete._id}`)
            .expect(204)

        const blogsAtEnd = await test_helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, test_helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(r => r.title)

        assert(!titles.includes(blogToDelete.title))

    })
})
})

after(async () => {
    await mongoose.connection.close()
  })










