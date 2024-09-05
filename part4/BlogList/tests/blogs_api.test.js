const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

let blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

describe.only('testing describe', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    //await Blog.insertMany(blogsList)
    const blogsObjects = blogs.map((blog) => new Blog(blog))
    const promiseArray = blogsObjects.map((blog) => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  describe('testing get all', () => {
    test.only('there are six blogs', async () => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, 6)
    })
  })

  describe('tests post success and error', () => {
    test.only('id named id and not _id', async () => {
      // first delete all blogs from db
      //await Blog.deleteMany({})

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

      await api.post('/api/blogs').send(blog).expect(400).expect({
        error: 'Blog validation failed: url: Path `url` is required.',
      })
    })
  })

  describe('testing delete:id', () => {
    test.only('delete successful', async () => {
      const firstBlog = await Blog.findOne({})
      await api.delete(`/api/blogs/${firstBlog._id}`).expect(204)
    })
    test.only('delete:id | 404 id not found ', async () => {
      await api.delete('/api/blogs/5a422a851a54a676234d17f0').expect(404)
    })

    test.only('delete:id | 400 bad request"', async () => {
      await api.delete('/api/blogs/5a422a851b54676d17f0').expect(400)
    })
  })

  describe('testing get:id whit error handler', () => {
    test.only('get:id successful', async () => {
      const blogDB = await Blog.findOne({})
      await api
        .get(`/api/blogs/${blogDB.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test.only('get:id | 404 id not found', async () => {
      await api.get('/api/blogs/5a422a851b54a676234d17f0').expect(404)
    })

    test.only('get:id | 400 bad request', async () => {
      await api.get('/api/blogs/5a42251b54a676234d17f0').expect(400)
    })
  })

  describe.only('put:id and check if like + 1', async () => {
    const blogGlobal = await Blog.findOne({})
    console.log(blogGlobal)

    test.only('put:id | successful', async () => {
      const newOne = {
        title: blogGlobal.title,
        author: blogGlobal.author,
        url: blogGlobal.url,
        likes: blogGlobal.likes + 1,
      }
      await api.put(`/api/blogs/${blogGlobal._id}`).send(newOne).expect(201)

      const blogss = await api.get('/api/blogs')
      const data = blogss.body
      const findBlog = data.find(
        (item) => item.id === blogGlobal._id.toString()
      )
      assert.strictEqual(findBlog.likes, blogGlobal.likes + 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
// comand to run just .only() test
//npm test -- --test-only
