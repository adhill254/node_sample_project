const util = require('util');
const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123password',
  port: 3306,
  database: 'tonyProject'
});

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }
  if (connection) connection.release();
});

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);


const executeQuery = async (query) => {
  return await pool.query(query).catch(error => error);
};

module.exports = {
  executeQuery
};
