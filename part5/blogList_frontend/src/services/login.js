import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/'

const login = async (obj) => {
  const response = await axios.post(`${baseUrl}login`, obj)
  return response.data
}

export default { login }
