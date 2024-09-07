const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blog', {
    title: 1,
    author: 1,
    likes: 1,
  })
  res.status(200).json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body
  //const salt = 10
  // validar aqui si el password.length es mayor a 3
  if (password.length < 3) {
    res
      .status(400)
      .json({ error: 'password too short, please try a longer password' })
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter
