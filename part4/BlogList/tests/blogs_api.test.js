const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

test.only('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 0)
})

test.only('id named id and not _id', async () => {
  // first delete all blogs from db
  await Blog.deleteMany({})

  const blog = {
    title: 'Marcos blog',
    author: 'Marco Rossel',
    url: 'www.marcorossel.com',
    likes: 1111,
  }
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect(/,"id":/gi) // this is the check id
    .expect('Content-Type', /application\/json/)
})

test.only('check post saved correctly with the length === 1', async () => {
  const checkLengthDB = await Blog.find({})
  assert.strictEqual(checkLengthDB.length, 1)
})

test.only('check default likes === 0', async () => {
  const blog = {
    title: 'Testing likes dafault 0',
    author: 'Random User',
    url: 'https://fullstackopen.com/es/part4/probando_el_backend#ejercicios-4-8-4-12',
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect(/,"likes":0/)
    .expect('Content-Type', /application\/json/)
})

test.only('return status 400 if dont include author', async () => {
  const blog = {
    title: 'Testing likes dafault 0',
    url: 'https://fullstackopen.com/es/part4/probando_el_backend#ejercicios-4-8-4-12',
  }

  await api.post('/api/blogs').send(blog).expect(400).expect({
    error: 'Blog validation failed: author: Path `author` is required.',
  })
})

test.only('return status 400 if dont include url ', async () => {
  const blog = {
    title: 'Testing likes dafault 0',
    author: 'Random User',
    likes: 777,
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)
    .expect({ error: 'Blog validation failed: url: Path `url` is required.' })
})

after(async () => {
  await mongoose.connection.close()
})
// comand to run just .only() test
//npm test -- --test-only
