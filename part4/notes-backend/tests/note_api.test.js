const { test, after, beforeEach, describe } = require('node:test')
const bcrypt = require('bcrypt')
const Note = require('../models/note')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const { initialNotes, notesInDb, usersInDb } = require('./test_helper')
const api = supertest(app)

describe('when there as initially some notes saved', () => {
  beforeEach(async () => {
    await Note.deleteMany({})
    const noteObjects = initialNotes.map((note) => new Note(note))
    const promiseArray = noteObjects.map((note) => note.save())
    await Promise.all(promiseArray)
  })
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two notes', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, 2)
  })
  test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map((e) => e.content)
    assert.strictEqual(contents.includes('HTML is easy'), true)
  })
  test('a specific note can be viewed', async () => {
    const notesAtStart = await notesInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultNote.body, noteToView)
  })
})

describe('addition of a new note', () => {
  test('note without content is not added', async () => {
    const newNote = {
      important: true,
    }
    await api.post('/api/notes').send(newNote).expect(400)
    const notesAtEnd = await notesInDb()

    assert.strictEqual(notesAtEnd.length, initialNotes.length)
  })
  test('a valid note can be added ', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await notesInDb()
    assert.strictEqual(notesAtEnd.length, initialNotes.length + 1)

    const contents = notesAtEnd.map((n) => n.content)

    assert(contents.includes('async/await simplifies making async calls'))
  })
})

describe('deletion of a note', () => {
  test('a note can be deleted', async () => {
    const notesAtStart = await notesInDb()
    const noteToDelete = notesAtStart[0]

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

    const notesAtEnd = await notesInDb()

    const contents = notesAtEnd.map((r) => r.content)
    assert(!contents.includes(noteToDelete.content))

    assert.strictEqual(notesAtEnd.length, notesAtStart.length - 1)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes(newUser.username))
  })
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})
after(async () => {
  await mongoose.connection.close()
})
