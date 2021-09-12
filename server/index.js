const express = require('express')
const cors = require('cors')
const app = express()
//const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const pool = require('./db')

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

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
  try {
    const q = await pool.query('SELECT 1 AS exists FROM users WHERE username = $1', [body.username])
    if (q.rows[0]) {
      res.status(405).json('user already exists')
      //logic return to client to request user change username for account creation or login
    }
    else {
      const body = req.body

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)
      const date = new Date().toISOString().slice(0, 19).replace('T', ' ')

      try {
        await pool.query('INSERT INTO users (username, passwordhash, creation_date) VALUES ($1, $2, $3)', [body.username, passwordHash, date])
        res.status(201).json('new user created')
      } catch (err) {
        console.log(err)
        res.status(500).json(err)
      }
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})