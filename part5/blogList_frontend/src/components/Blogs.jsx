import ToggleComponent from './ToggleComponent'

const Blogs = ({ blogs }) => {
  const handleLike = () => {
    console.log('new like, we need to put to blog with this id')
  }
  return blogs.map((item) => (
    <div key={item.id} className="blog">
      <div className="userinfo">
        <p>username : {item.user.username}</p>
        <p>name : {item.user.name}</p>
      </div>
      <ToggleComponent textShow="show blog" textHide="hide blog">
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
            <p>likes : {item.likes}</p>
            <button onClick={handleLike}>like</button>
          </div>
        </div>
      </ToggleComponent>
    </div>
  ))
}

export default Blogs
