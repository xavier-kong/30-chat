const { Client } = require('pg');

const pgclient = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
});

pgclient.connect();

const uid = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'
const table = 'CREATE TABLE users (    user_uid UUID DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY, username VARCHAR(100) NOT NULL, passwordhash VARCHAR(200) NOT NULL, creation_date TIMESTAMP NOT NULL,    UNIQUE(user_uid), UNIQUE(username), UNIQUE(passwordhash))'

pgclient.query(uid, (err, res) => {
    if (err) throw err
});

pgclient.query(table, (err, res) => {
    if (err) throw err
});
