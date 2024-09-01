const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const config = require('./utils/config')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URL)
  .then(result => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app