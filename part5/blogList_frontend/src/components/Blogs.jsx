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
        <p>
          url :{' '}
          <a href={item.url} target="_blank">
            link to {item.title} blog
          </a>
        </p>
        <p>likes : {item.likes}</p>
      </div>
    </div>
  ))
}

export default Blogs
