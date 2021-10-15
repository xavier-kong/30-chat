require('dotenv').config()
const { Client } = require('pg')

const { POSTGRES_HOST, POSTGRES_PORT, DATABASE_URL, CONNECTION_STRING } = process.env;
const pool = process.env.NODE_ENV === 'test' 
  ? require('knex')({
  client: 'pg',
  connection: {
    host : POSTGRES_HOST,
    user : 'postgres',
    password : 'postgres',
    database : 'postgres_test',
    port: POSTGRES_PORT
  }
  })
  : 
  require('knex')({
    client: 'pg',
    connectionString: process.env.CONNECTION_STRING,
      ssl: {
    rejectUnauthorized: false
  }
  })

pool.select('NOW').as('now')

pool.raw("SELECT NOW() as now").then((res) => {
    console.log(`Connected to PostgreSQL at time ${res.rows[0].now}`);
})
.catch((e) => {
    console.log("PostgreSQL not connected");
    console.error(e);
});
  
module.exports = pool
