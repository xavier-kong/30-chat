const express = require('express')
const cors = require('cors')
const app = express();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const pool = require('./db')

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

pool.connect((err, client, done) => {
  if (err) throw err
  client.query('SELECT NOW() as now', (err, res) => {
    done()
    if (err) {
      console.log(err.stack)
    } else {
      console.log(`Connected to postgres at time ${res.rows[0].now}`)
    }
  })
})

//route for api/users/login
//rount for api/users/create

app.post('/api/users/create', async(req, res) => {
  const body = req.body
  const query = {
    text: 'SELECT 1 AS exists FROM users WHERE username = $1',
    values: [body.username]
  }
  try {
    const q = await pool.query(query)
    if (q.rows[0]) {
      res.json('exists')
      //logic return to client to request user change username for account creation
    }
    else {
      res.json('free')
      //logic to create new user
    }
  } catch (err) {
    console.log(err)
  }
})