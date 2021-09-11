const Pool = require('pg').Pool
require('dotenv').config();

const chatpool = new Pool({
  user: 'postgres',
  password: process.env.PASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'chat'
})

const groupspool = new Pool({
  user: 'postgres',
  password: process.env.PASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'groups'
})

const userspool = new Pool({
  user: 'postgres',
  password: process.env.PASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'users'
})

module.exports = chatpool, groupspool, userspool