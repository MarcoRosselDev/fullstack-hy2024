const Blogs = ({ blogs }) => {
  return blogs.map((item) => (
    <div key={item.id} className="blog">
      <div className="userinfo">
        <p>username : {item.user.username}</p>
        <p>name : {item.user.name}</p>
      </div>
      <div className="bloginfo">
        <p>title : {item.title}</p>
        <p>author : {item.author}</p>
        <p>url : {item.url}</p>
        <p>likes : {item.likes}</p>
      </div>
    </div>
  ))
}

export default Blogs
