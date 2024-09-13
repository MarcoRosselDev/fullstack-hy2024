import ToggleComponent from './ToggleComponent'
import blogsServices from '../services/blogs'
import { useState } from 'react'

const Blog = ({ item }) => {
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
    </div>
  )
}

const Blogs = ({ blogs }) => {
  return blogs.map((item) => (
    <div key={item.id} className="blog">
      <div className="userinfo">
        <p>username : {item.user.username}</p>
        <p>name : {item.user.name}</p>
      </div>
      <ToggleComponent textShow="show blog" textHide="hide blog">
        <Blog item={item} />
      </ToggleComponent>
    </div>
  ))
}

export default Blogs
