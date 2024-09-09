import { useEffect, useState } from 'react'
import blogsServices from './services/blogs'
import loginServices from './services/login'
import './App.css'
import Blogs from './components/Blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  useEffect(() => {
    blogsServices.getBlogs().then((data) => setBlogs(data))
  }, [])
  useEffect(() => {
    const checkToken = window.localStorage.getItem('tokenApp')
    checkToken ? setToken(checkToken) : null
  }, [])

  const handleSubmitLogin = (e) => {
    e.preventDefault()
    const myObj = { username, password }
    console.log(myObj)
    loginServices.login(myObj).then((data) => {
      window.localStorage.setItem('tokenApp', data.token)
      setToken(data.token)
      setUser(data)
    })
    setPassword('')
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const formLogin = () => (
    <form onSubmit={handleSubmitLogin} className="loginform">
      <h1>Login</h1>
      <label htmlFor="username">username</label>
      <input type="text" id="username" onChange={handleChangeUsername} />
      <label htmlFor="password">password</label>
      <input type="password" id="password" onChange={handleChangePassword} />
      <button type="submit">login user</button>
    </form>
  )

  return (
    <>
      {token ? (
        <p>ya se inicio el usuario con el token : {token}</p>
      ) : (
        formLogin()
      )}
      <Blogs blogs={blogs} />
    </>
  )
}

export default App
