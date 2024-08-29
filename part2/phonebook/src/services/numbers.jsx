import axios from "axios"
const url = "/persons"

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

const putPhone = (id, newData) => {
  const request = axios.put(`${url}/${id}`, newData)
  return request.then(response => response.data)
}

export default {
  getAll, 
  addPhone,
  deletePhone,
  putPhone,
}