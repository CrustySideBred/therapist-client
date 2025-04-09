const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost', // Server host
  user: 'root', // Username
  password: 'sunnysideup1120', // Database password
  database: 'cs230_u240157', // Database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Export the database connection
module.exports = db;