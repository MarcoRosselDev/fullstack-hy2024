const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (listBlogs) => {
  return listBlogs.reduce((sum, blog) => sum + blog.likes, 0)
}

module.exports = { dummy, totalLikes }