const Pool = require('pg').Pool
require('dotenv').config()

const pool = process.env.NODE_ENV === 'test' 
  ? new Pool({
    user: 'postgres',
    password: 'postgres',
    host: process.env.POSTGES_HOST,
    port: process.env.POSTGRES_PORT,
    database: 'postgres_test'
  })
  : new Pool({
    user: 'postgres',
    password: process.env.PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'postgres'
  })

module.exports = pool