const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (!user.id) {
    res.status(400).json({ error: 'username or password incorrect' })
  }
  const checkPassword = await bcrypt.compare(password, user.passwordHash)

  if (!checkPassword) {
    res.status(400).json({ error: 'username or password incorrect' })
  }
  const payload = {
    id: user._id,
    username: user.username,
  }
  const token = jwt.sign(payload, SECRET)
  res.status(201).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
