const { Client } = require('pg');

const pgclient = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
});

pgclient.connect();

const uid = 'CREATE EXTENSION uuid-ossp'
// const table = 'CREATE TABLE users (    user_uid UUID DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY, username VARCHAR(100) NOT NULL, passwordhash VARCHAR(200) NOT NULL, creation_date TIMESTAMP NOT NULL,    UNIQUE(user_uid), UNIQUE(username), UNIQUE(passwordhash))'

const table = 'CREATE TABLE student(id SERIAL PRIMARY KEY, firstName VARCHAR(40) NOT NULL, lastName VARCHAR(40) NOT NULL, age INT, address VARCHAR(80), email VARCHAR(40))'

// pgclient.query(uid, (err, res) => {
//     if (err) {
//         console.log('error', err)
//     }
// });

pgclient.query(table, (err, res) => {
    if (err) {
        console.log('error', err)
    }
});

pgclient.end()
