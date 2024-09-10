import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/'

const getBlogs = async () => {
  const blogs = await axios.get(`${baseUrl}blogs`)
  return blogs.data
}

const newBlog = async (obj, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const blog = await axios.post(`${baseUrl}blogs`, obj, config)
  return blog.data
}

export default { getBlogs, newBlog }
