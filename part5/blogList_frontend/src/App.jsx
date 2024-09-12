import { useEffect, useState } from 'react'
import blogsServices from './services/blogs'
import loginServices from './services/login'
import './App.css'
import Blogs from './components/Blogs'
import ToggleComponent from './components/ToggleComponent'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)

  //new blog states
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')
  useEffect(() => {
    blogsServices.getBlogs().then((data) => setBlogs(data))
  }, [])
  useEffect(() => {
    const checkToken = window.localStorage.getItem('tokenApp')
    checkToken ? setToken(checkToken) : null
    checkToken ? setUsername(window.localStorage.getItem('username')) : null
  }, [])

  const handleSubmitLogin = (e) => {
    e.preventDefault()
    const myObj = { username, password }
    console.log(myObj)
    loginServices.login(myObj).then((data) => {
      window.localStorage.setItem('tokenApp', data.token)
      window.localStorage.setItem('username', data.username)
      setToken(data.token)
      setPassword('')
      setTitle('')
      setAuthor('')
    })
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleChangeUsername = (e) => {
    setUsername(e.target.value)
  }
  const handleNewBlog = (e) => {
    e.preventDefault()
    const saveThisBlog = {
      title,
      author,
      url,
      likes,
    }
    blogsServices
      .newBlog(saveThisBlog, token)
      .then((data) => {
        console.log(data)
        setBlogs((prev) => prev.concat(data))
        setTitle('')
        setAuthor('')
        setUrl('')
        setLikes('')
      })
      .catch((error) => console.log(error))
  }
  //new blog form
  const handleNewTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleNewAuthor = (e) => {
    setAuthor(e.target.value)
  }
  const handleNewUrl = (e) => {
    setUrl(e.target.value)
  }
  const handleNewLikes = (e) => {
    setLikes(e.target.value)
  }

  const formBlogs = () => (
    <form onSubmit={handleNewBlog} className="loginform">
      <h1>new Blog</h1>
      <label htmlFor="title">title</label>
      <input type="text" id="title" onChange={handleNewTitle} value={title} />
      <label htmlFor="author">author</label>
      <input
        type="text"
        id="author"
        onChange={handleNewAuthor}
        value={author}
      />
      <label htmlFor="url">url</label>
      <input type="text" id="url" onChange={handleNewUrl} value={url} />
      <label htmlFor="likes">likes</label>
      <input type="number" id="likes" onChange={handleNewLikes} value={likes} />
      <button type="submit">new blog</button>
      <button onClick={logout}>logout</button>
    </form>
  )

  const formLogin = () => (
    <form onSubmit={handleSubmitLogin} className="loginform">
      <h1>Login</h1>
      <label htmlFor="username">username</label>
      <input
        type="text"
        id="username"
        onChange={handleChangeUsername}
        value={username}
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        onChange={handleChangePassword}
        value={password}
      />
      <button type="submit">login user</button>
    </form>
  )
  const logout = (e) => {
    e.preventDefault()
    window.localStorage.clear()
    setUsername('')
    setPassword('')
    setToken(null)
  }

  return (
    <>
      <div className="form-sec">
        {token ? (
          <ToggleComponent
            textShow="show form new blog"
            textHide="hide form new blog"
          >
            {formBlogs()}
          </ToggleComponent>
        ) : (
          <ToggleComponent textShow="login" textHide="hide login">
            {formLogin()}
          </ToggleComponent>
        )}
      </div>
      <Blogs blogs={blogs} />
    </>
  )
}

export default App
