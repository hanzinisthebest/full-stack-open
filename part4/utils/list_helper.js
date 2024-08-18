const dummy = (blogs) => {
    return 1
  }
const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)    
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    return blogs.reduce((acc, blog) => (acc.likes > blog.likes) ? acc : blog, blogs[0])
}

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return null
    }
    const authors = blogs.map(blog => blog.author)
    const authorCount = {}
    authors.forEach(author => {
        if (authorCount[author]) {
            authorCount[author] += 1
        } else {
            authorCount[author] = 1
        }
    })

    return Object.entries(authorCount).reduce((acc, [author, count]) => {
        if (acc.count > count) {
            return acc
        }
        return { author, count }
    }, { author: '', count: 0 })
}
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }