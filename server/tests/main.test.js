// const supertest = require('supertest')
// const index = require('../index')
const PgMock2 = require('./pgmock2').default
const client = new PgMock2()
//const api = supertest(index)

client.add('SELECT * FROM users WHERE username = $1', [], {
  rowCount: 1,
  rows: [
    { 
      user_uid: 'd7df0783-de6e-4ad6-bbcd-0d3b8b3e5789',
      username: 'test',
      passwordhash: '$2b$10$lWD.IKXBUeZOf2vA0ZwfD.jFThx.XGmUdkK90bq7aCtDK02ZZs8HG',
      creation_date: '2021-09-12 07:53:14'
    }
  ]
})

// beforeEach(async () => {
  
// })


// SELECT * FROM users WHERE username = $1
// SELECT 1 AS exists FROM users WHERE username = $1
// INSERT INTO users (username, passwordhash, creation_date) VALUES ($1, $2, $3


