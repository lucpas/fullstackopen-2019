const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res) => {
  try {
    const body = req.body;

    if (body.username.length < 3) {
      throw new Error('username must be at least 3 characters long')
    }

    if (body.password.length < 3) {
      throw new Error('password must be at least 3 characters long')
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();

    res.json(savedUser);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs');
  res.json(users.map(u => u.toJSON()));
});

module.exports = usersRouter;
