const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
//const assert = require('node:assert')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)
describe.only('testing describe', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })
  test.only('crear usuario and check unike username', async () => {
    await api
      .post('/api/users')
      .send({
        name: 'marco',
        username: 'marcus',
        password: 'moka',
      })
      .expect(201)
    await api
      .post('/api/users')
      .send({
        name: 'marco',
        username: 'marcus',
        password: 'moka',
      })
      .expect(400)
      .expect('{"error":"expected `username` to be unique"}')
  })
  //test.only('check username unike', async () => {})
  test.only('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await mongoose.connection.close()
})
