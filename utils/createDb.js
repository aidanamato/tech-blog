const mysql = require('mysql2');
require('dotenv').config();

async function createDb() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PW
  });
  connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
}

module.exports = createDb;