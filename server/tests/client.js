const { Pool } = require('pg');

const pgclient = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: 'postgres',
    password: process.env.PASSWORD,
    database: 'postgres'
});

console.log('I made it here')

pgclient.connect();

const table = `CREATE TABLE users (
    user_uid UUID DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY,
      username VARCHAR(100) NOT NULL,
      passwordhash VARCHAR(200) NOT NULL,
    creation_date TIMESTAMP NOT NULL,
    UNIQUE(user_uid),
    UNIQUE(username),
    UNIQUE(passwordhash)
  )`

pgclient.query(table, (err, res) => {
    if (err) throw err
});