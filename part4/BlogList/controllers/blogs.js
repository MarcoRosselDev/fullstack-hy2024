const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { SECRET } = require('../utils/config')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const notes = await Blog.find({}).populate('user', { name: 1, username: 1 })
  res.json(notes)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  blog ? res.status(200).json(blog) : res.status(404).end()
})

const getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const decodedToken = jwt.verify(getTokenFrom(req), SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id,
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id)
  blog ? res.status(204).end() : res.status(404).end()
})

blogsRouter.put('/:id', async (req, res) => {
  let blog = await Blog.findById(req.params.id)
  console.log(blog)
  blog.likes = blog.likes + 1
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  })
  updatedBlog ? res.status(201).json(updatedBlog) : res.status(404).end()
})

module.exports = blogsRouter
