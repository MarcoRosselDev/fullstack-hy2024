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
  
})