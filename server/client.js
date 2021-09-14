const { Client } = require('pg');

const pgclient = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres_test'
});

pgclient.connect();

const uid = 'CREATE EXTENSION $1'
const table = 'CREATE TABLE users ( user_uid UUID DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY, username VARCHAR(100) NOT NULL, passwordhash VARCHAR(200) NOT NULL, creation_date TIMESTAMP NOT NULL, UNIQUE(user_uid), UNIQUE(username), UNIQUE(passwordhash))'
// const table = 'CREATE TABLE student(id SERIAL PRIMARY KEY, firstName VARCHAR(40) NOT NULL, lastName VARCHAR(40) NOT NULL, age INT, address VARCHAR(80), email VARCHAR(40))'
// const text = 'INSERT INTO student(firstname, lastname, age, address, email) VALUES($1, $2, $3, $4, $5) RETURNING *'
// const values = ['Mona the', 'Octocat', 9, '88 Colin P Kelly Jr St, San Francisco, CA 94107, United States', 'octocat@github.com']

pgclient.query(uid, ['uuid-ossp'], (err, res) => {
    if (err) throw err
});

pgclient.query(table, (err, res) => {
    if (err) throw err
});

pgclient.query('SELECT * FROM user', (err, res) => {
    if (err) throw err
    console.log(err, res.rows) // Print the data in student table
    pgclient.end()
});
