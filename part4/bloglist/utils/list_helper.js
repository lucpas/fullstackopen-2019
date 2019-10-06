const _ = require('lodash');

const dummy = () => 1;

const totalLikes = blogs => blogs.reduce((acc, curr) => acc + curr.likes, 0);

const favoriteBlog = blogs => {
  return blogs.reduce((acc, curr) => (acc.likes > curr.likes ? acc : curr), {
    likes: -1,
  });
};

const mostBlogs = blogs => {
  const authors = _.countBy(blogs, blog => blog.author);
  const topAuthor = Object.keys(authors).reduce((acc, curr) =>
    authors[acc] > authors[curr] ? acc : curr,
  );

  return { author: topAuthor, blogs: authors[topAuthor] };
};

const mostLikes = blogs => {
  const authors = blogs.reduce((acc, blog) => {
    acc[blog.author] = acc[blog.author]
      ? acc[blog.author] + blog.likes
      : blog.likes;
    return acc;
  }, {});

  const topAuthor = Object.keys(authors).reduce((acc, curr) =>
    authors[acc] > authors[curr] ? acc : curr,
  );

  return { author: topAuthor, likes: authors[topAuthor] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
