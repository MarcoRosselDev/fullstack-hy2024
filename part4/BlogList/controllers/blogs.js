const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const notes = await Blog.find({})
  res.json(notes)
})

blogsRouter.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

blogsRouter.post('/', (req, res, next) => {
  const body = req.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })
  blog
    .save()
    .then((savedBlog) => {
      res.json(savedBlog)
    })
    .catch((error) => next(error))
})

blogsRouter.delete('/:id', (req, res, next) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error))
})

blogsRouter.put('/:id', (req, res, next) => {
  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    .then((updatedBlog) => res.json(updatedBlog))
    .catch((error) => next(error))
})

module.exports = blogsRouter
