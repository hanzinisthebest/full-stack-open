const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  if (password.length < 3 || username.length < 3) {
    return response.status(400).json({
      error: 'username and password must be at least 3 characters long'
    })
  }
  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
  .find({}).populate('blogs', { url: 1, title: 1, author: 1 })

    response.json(users)
  })

  usersRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(user)
  })

  usersRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    const blogs = await Blog.find({ user: id })

    if (blogs.length > 0) {
      for (const blog of blogs) {
        await Blog.findByIdAndDelete(blog._id)
      }
    }
    await User.findByIdAndDelete(id)
    response.status(204).end()
  })

module.exports = usersRouter