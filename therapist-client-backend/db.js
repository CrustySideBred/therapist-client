const mysql = require('mysql2/promise'); // Using promise-based version

const pool = mysql.createPool({
  host: 'webcourse.cs.nuim.ie',
  user: 'u240157',
  password: 'Huavai9ea9iech6e',
  database: 'cs230_u240157',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
pool.getConnection()
  .then(conn => {
    console.log('✅ Connected to MySQL database');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  });

module.exports = pool;