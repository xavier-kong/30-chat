require('dotenv').config()

const { POSTGRES_HOST, DATABASE_URL, NODE_ENV } = process.env;
const pool = NODE_ENV === 'test' 
  ? require('knex')({
  client: 'pg',
  connection: {
    host : 'postgres',
    user : 'postgres',
    password : 'postgres',
    database : 'postgres_test',
    port: 5432
  }
  }) :
  NODE_ENV === 'dev'
  ? require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 'postgres',
      database : 'postgres_test',
      port: 5432
    }
    }) :
  require('knex')({
    client: 'pg',
    connection: DATABASE_URL,
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
