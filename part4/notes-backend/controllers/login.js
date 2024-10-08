const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { SECRET } = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(404).json({ error: 'invalid username or password' })
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  // se puede limitar la duracion del token para mas seguridad
  //const token = jwt.sign(userForToken, SECRET)
  const token = jwt.sign(userForToken, SECRET, { expiresIn: 60 * 60 })
  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
