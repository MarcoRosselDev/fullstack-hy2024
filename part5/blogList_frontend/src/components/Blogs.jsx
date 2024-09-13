import ToggleComponent from './ToggleComponent'
import blogsServices from '../services/blogs'
import { useState } from 'react'

const Blog = ({ item, token, setBlogs }) => {
  const [likeState, setLikeState] = useState(item.likes)

  const handleLike = (id) => {
    //e.preventDefault()
    blogsServices
      .uppLike(id)
      .then(() => {
        setLikeState((prev) => prev + 1)
      })
      .catch((error) => console.log(error))
  }
  const handleDelete = (id) => {
    console.log(id)
    blogsServices
      .deleteBlog(id, token)
      .then((data) => {
        console.log(data)
        setBlogs((prev) => prev.filter((item) => item.id !== data.id))
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className="bloginfo">
      <p>title : {item.title}</p>
      <p>author : {item.author}</p>
      <p>
        url :{' '}
        <a href={item.url} target="_blank">
          link to {item.title} blog
        </a>
      </p>
      <div className="like">
        <p>likes : {likeState}</p>
        <button onClick={() => handleLike(item.id)}>like</button>
      </div>
      <button onClick={() => handleDelete(item.id)}>delete blog</button>
    </div>
  )
}

const Blogs = ({ blogs, token, setBlogs }) => {
  return blogs.map((item) => (
    <div key={item.id} className="blog">
      <div className="userinfo">
        <p>username : {item.user.username}</p>
        <p>name : {item.user.name}</p>
      </div>
      <ToggleComponent textShow="show blog" textHide="hide blog">
        <Blog item={item} token={token} setBlogs={setBlogs} />
      </ToggleComponent>
    </div>
  ))
}

export default Blogs
