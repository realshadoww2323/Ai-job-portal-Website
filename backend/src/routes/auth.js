const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const { mockStore, findUser, addUser } = require('../utils/mockDb');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const isMock = global.useMockDb || mongoose.connection.readyState !== 1;
    if (isMock) {
      if (findUser(email)) return res.status(400).json({ message: 'User already exists' });
      const newUser = addUser({ name, email, password, role: role || 'seeker' });
      const token = jwt.sign({ user: { id: newUser.id, role: newUser.role } }, process.env.JWT_SECRET || 'secret');
      return res.json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
    }

    let user = await User.findOne({ email });

    user = new User({
      name,
      email,
      password,
      role: role || 'seeker'
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const isMock = global.useMockDb || mongoose.connection.readyState !== 1;
    if (isMock) {
      const user = findUser(email);
      if (!user || user.password !== password) return res.status(400).json({ message: 'Invalid Credentials' });
      user.lastLogin = new Date(); // Update last login
      const token = jwt.sign({ user: { id: user.id, role: user.role } }, process.env.JWT_SECRET || 'secret');
      return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    }

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    user.lastLogin = new Date();
    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/auth/me
// @desc    Get current user profile
// @access  Private
const auth = require('../middleware/auth');
router.get('/me', auth, async (req, res) => {
  try {
    if (global.useMockDb) {
      const user = mockStore.users.find(u => u.id === req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      const { password, ...userWithoutPassword } = user;
      return res.json(userWithoutPassword);
    }
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
