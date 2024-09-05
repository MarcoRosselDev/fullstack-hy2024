const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const notes = await Blog.find({})
  res.json(notes)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  blog ? res.status(200).json(blog) : res.status(404).end()
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  })
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id)
  blog ? res.status(204).end() : res.status(404).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  })
  updatedBlog ? res.status(201).json(updatedBlog) : res.status(404).end()
})

module.exports = blogsRouter
