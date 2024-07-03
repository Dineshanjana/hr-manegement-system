// backend\controllers\userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByUsername } = require('../models/userModel');

const register = (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send('Error hashing password');
    }

    createUser(email, hash, (err, result) => {
      if (err) {
        return res.status(500).send('Error registering user');
      }

      res.status(200).send('User registered successfully');
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  getUserByUsername(email, (err, result) => {
    if (err) {
      return res.status(500).send('Error logging in');
    }

    if (result.length === 0) {
      return res.status(401).send('User not found');
    }

    const user = result[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).send('Error comparing passwords');
      }

      if (!isMatch) {
        return res.status(401).send('Invalid password');
      }

      const token = jwt.sign({ id: user.id }, '626d50aeade1d2ea701e706fb707836ac6cd30ea939807c22d6640fe5d5ca67866ec062a5cb7', { expiresIn: '1h' });
      req.session.user = { id: user.id, email: user.email }; // Adjusted to use 'email' instead of 'username'
      res.status(200).json({ token });
    });
  });
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.status(200).send('Logged out successfully');
  });
};

module.exports = { register, login, logout };
