import axios from "axios"
const url = "http://localhost:3001/persons"

const getAll = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const addPhone = newNumber => {
  const request = axios.post(url, newNumber)
  return request.then(response => response.data)
}

const deletePhone = id => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => response.data)
}

export default {
  getAll, 
  addPhone,
  deletePhone,
}