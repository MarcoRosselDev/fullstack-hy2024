const { test, after, beforeEach } = require('node:test')
const Note = require('../models/note')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const { initialNotes, notesInDb } = require('./test_helper')

const api = supertest(app)
// antes de iniciar borramos toda la base de datos de prueba
// luego publicamos este array en la base de datos de prueba
beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  noteObject = new Note(initialNotes[1])
  await noteObject.save()
})
// ahora podemos hacer las pruebas
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

  /* const response = await api.get('/api/notes')

  const contents = response.body.map((r) => r.content)

  assert.strictEqual(response.body.length, initialNotes.length + 1) */
  const notesAtEnd = await notesInDb()
  assert.strictEqual(notesAtEnd.length, initialNotes.length + 1)

  const contents = notesAtEnd.map((n) => n.content)

  assert(contents.includes('async/await simplifies making async calls'))
})

test('note without content is not added', async () => {
  const newNote = {
    important: true,
  }
  await api.post('/api/notes').send(newNote).expect(400)
  const notesAtEnd = await notesInDb()

  assert.strictEqual(notesAtEnd.length, initialNotes.length)

  /* await api.post('/api/notes').send(newNote).expect(400)

  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, initialNotes.length) */
})

after(async () => {
  await mongoose.connection.close()
})
