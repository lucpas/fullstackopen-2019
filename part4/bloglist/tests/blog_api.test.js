const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Person 1',
    url: 'www.url1.com',
    likes: 1,
  },
  {
    title: 'Blog 2',
    author: 'Person 2',
    url: 'www.url2.com',
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.create(initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('unique identifier of blog objects is named "id"', async () => {
  const response = await api.get('/api/blogs');
  // console.log(response);
  expect(response.body[0].id).toBeDefined();
});

test('a new blog can be created', async () => {
  const newBlog = {
    title: 'Blog 3',
    author: 'Person 3',
    url: 'www.url3.com',
    likes: 3,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const blog = response.body.find(blog => blog.title === 'Blog 3');

  expect(response.body.length).toBe(initialBlogs.length + 1);
  expect(blog).toMatchObject(newBlog);
});

test('a new blog with no likes specified will default to 0 likes', async () => {
  const newBlog = {
    title: 'Blog 3',
    author: 'Person 3',
    url: 'www.url3.com',
  };

  await api.post('/api/blogs').send(newBlog);

  const response = await api.get('/api/blogs');

  const blog = response.body.find(blog => blog.title === 'Blog 3');

  expect(blog.likes).toBe(0);
});

test('a new blog without title and url is rejected', async () => {
  const newBlog = {
    author: 'Person 3',
    likes: 3,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const response = await api.get('/api/blogs');

  expect(response.body.length).toBe(initialBlogs.length);
});

describe('deletion of a blog', () => {
  test('succeeds with status 204 if id is valid', async () => {
    const response = await api.get('/api/blogs');
    const idToDelete = response.body[0].id;

    await api.delete(`/api/blogs/${idToDelete}`).expect(204);

    const resAfterDelete = await api.get('/api/blogs');

    expect(resAfterDelete.body.length).toBe(initialBlogs.length - 1);
  });
  test('fails with status 404 if id is invalid', async () => {
    await api.delete('/api/blogs/01234').expect(404);

    const response = await api.get('/api/blogs');

    expect(response.body.length).toBe(initialBlogs.length);
  });
});

describe('updating a blog', () => {
  const newBlog = {
    title: 'Blog 3',
    author: 'Person 3',
    url: 'www.url3.com',
    likes: 3,
  };
  test('succeeds with status 200 if id is valid', async () => {
    const response = await api.get('/api/blogs');
    const idToUpdate = response.body[0].id;

    await api
      .put(`/api/blogs/${idToUpdate}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const responseAfterUpdate = await api.get('/api/blogs');

    const blog = responseAfterUpdate.body.find(blog => blog.id === idToUpdate);

    expect(responseAfterUpdate.body.length).toBe(initialBlogs.length);
    expect(blog).toMatchObject(newBlog);
  });
  test('fails with status 404 if id is invalid', async () => {
    await api
      .put('/api/blogs/01234')
      .send(newBlog)
      .expect(404);

    const response = await api.get('/api/blogs');

    expect(response.body.length).toBe(initialBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
