require('dotenv').config()

const MONGODB_URL = process.env.URL
const PORT = process.env.PORT

module.exports = {
  MONGODB_URL,
  PORT
}