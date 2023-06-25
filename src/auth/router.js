const express = require('express');
const { User } = require('./models');
const basicAuth = require('./middleware/basic');
const bcrypt = require('bcrypt');


const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the API!');
  });

// Signup endpoint
router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({ username, password });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// Signin endpoint
router.post('/signin', basicAuth, (req, res) => {
  res.json({ user: req.user });
});

// Get all users
router.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Get user by ID
router.get('/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
