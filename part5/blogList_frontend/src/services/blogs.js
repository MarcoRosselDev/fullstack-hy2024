import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/'

const getBlogs = async () => {
  const blogs = await axios.get(`${baseUrl}blogs`)
  return blogs.data
}

export default { getBlogs }
