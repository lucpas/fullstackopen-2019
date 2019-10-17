const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs);
  });
});

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    })
    .catch(error => response.status(400).json(error));
});

blogsRouter.delete('/:id', (request, response) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(() => response.status(404).end());
});

blogsRouter.put('/:id', (request, response) => {
  Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    .then(result => response.json(result))
    .catch(error => response.status(404).end());
});

module.exports = blogsRouter;
