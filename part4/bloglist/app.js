const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blogsRouter');
const usersRouter = require('./controllers/usersRouter');
const loginRouter = require('./controllers/login');
const config = require('./utils/config');
const middleware = require('./utils/middleware');

// mongoose.set('useFindAndModify', false);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(error => {
    console.log(`Error connecting to database: ${error}`);
    mongoose.connection.close();
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(middleware.tokenExtraktor)
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;
