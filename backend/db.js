const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'employee' // Name of the database you created
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Handle connection errors and disconnections
connection.on('error', err => {
  console.error('Database connection error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    // Reconnect if the connection is lost
    connection.connect(error => {
      if (error) {
        console.error('Error reconnecting to the database:', error);
      } else {
        console.log('Reconnected to the MySQL database');
      }
    });
  } else {
    throw err;
  }
});

module.exports = connection;
