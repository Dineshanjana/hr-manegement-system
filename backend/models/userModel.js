// backend\models\userModel.js
const db = require('../db');

const createUser = (username, hashedPassword, callback) => {
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, hashedPassword], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

const getUserByUsername = (username, callback) => {
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

module.exports = { createUser, getUserByUsername };
