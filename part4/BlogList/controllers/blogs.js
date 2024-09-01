const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog.find({}).then(notes => {
    res.json(notes)
  })
})

blogsRouter.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id)
  .then(note => {
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

blogsRouter.post('/', (req, res, next) => {
  const body = req.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  blog.save()
  .then(savedBlog =>{
    res.json(savedBlog)
  })
  .catch(error => next(error))
})

module.exports = blogsRouter